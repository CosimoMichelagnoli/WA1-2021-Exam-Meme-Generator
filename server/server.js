'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const express = require('express');
const morgan = require('morgan');


const dao = require('./dao');
const userDao = require('./creator_dao');




// initialize and configure passport
passport.use(new LocalStrategy(
  function (username, password, done){
  console.log("inside passport use");

    // verification callback for authentication
    userDao.getUser(username, password).then((user) => {
    console.log("inside THEN of getUser");

      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    }).catch(err=> console.log(err));
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

const app = express();
const PORT = 3001;
app.use(morgan('dev'));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}

// initialize and configure HTTP sessions
app.use(session({
  secret: 'this and that and other',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());



// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});





// login
app.post('/api/sessions', function (req, res, next) {
  console.log("inside api/session POST");
  passport.authenticate('local', (err, user, info) => {
    console.log("starting authentication");
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    console.log("success perform the login");
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

app.get('/api/memes', isLoggedIn, (req, res) => {
  console.log("what");
  dao.filterMemesCreators()
    .then((memes) => res.json(memes))
    .catch((error) => { res.status(500).json(error); });
});

app.get('/api/public/memes', (req, res) => {
  dao.filterMemes()
    .then((memes) => res.json(memes))
    .catch((error) => { res.status(500).json(error); });
});

app.get('/api/memes/images/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const image = await dao.getById(id);
    res.json(image);
  } catch (error) {
    res.status(500).json(error);
  }

});

app.post('/api/tasks/insert', isLoggedIn, async (req, res) => {
  const description = req.body.description;
  const important = req.body.important;
  const private_ = req.body.private;
  const deadline = req.body.deadline;

  const task = { description: description, important: important, private: private_, deadline: deadline };
  try {
    console.log("server log " + task);
    await dao.createTask(task, req.user.id);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put('/api/tasks/update', isLoggedIn, async (req, res) => {

  const id = req.body.id;
  const description = req.body.description;
  const important = req.body.important;
  const private_ = req.body.private;
  const deadline = req.body.deadline;
  console.log("body: " + req.body.deadline);
  console.log("task: " + deadline);
  const task = { id: id, description: description, important: important, private: private_, deadline: deadline };
  try {
    await dao.updateTask(task, req.user.id);
    res.end();

  } catch (error) {
    res.status(500).json(error);
  }
});

app.patch('/api/tasks/mark', isLoggedIn, async (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  const task = { id: id, completed: completed };
  try {
    await dao.markCompleted(task, req.user.id);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete('/api/tasks/delete/:id', isLoggedIn, async (req, res) => {
  const id = req.params.id;
  try {
    await dao.deleteTask(id, req.user.id);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));