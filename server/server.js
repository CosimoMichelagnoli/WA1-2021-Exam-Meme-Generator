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

app.get('/api/allImages', (req, res) => {
  dao.getImages()
    .then((images) => res.json(images))
    .catch((error) => { res.status(500).json(error); });
});

app.post('/api/meme/insert', isLoggedIn, async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageID = req.body.imageID;
  const color = req.body.color;
  const font = req.body.font;
  const ntext = req.body.ntext;
  const text1 = req.body.text1;
  const text2 = req.body.text2;
  const text3 = req.body.text3;
  const protect = req.body.protect;
  const creator = req.body.creator;
  
  const meme = { id: id, title: title, imageID: imageID, color: color, font: font, 
    ntext: ntext,text1: text1,text2: text2,text3: text3,protect: protect,creator: creator};
    try {
      await dao.createMeme(meme);
      res.end();
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  app.delete('/api/meme/delete/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    try {
      await dao.deleteMeme(id);
      res.end();
    } catch (error) {
      res.status(500).json(error);
    }
  });



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));