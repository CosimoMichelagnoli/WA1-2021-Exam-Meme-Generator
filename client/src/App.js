
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import API from "./API";



import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogoutButton, LoginForm } from './LoginComponents';
import { MyNav, MyMain, MyMeme, MyEdit } from './Components';
function App() {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [meme, setMemes] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState([]);

  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(0);
  const [tempMeme, setTempMeme] = useState('');
  const [image, setMemeImage] = useState('');
  
  useEffect(() => {
    console.log("useEffect of app.js");

    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        const user = await API.getUserInfo();
        setUser(user);
        setLoggedIn(true);
      } catch (err) {
        console.error(err.error);
      }
    };
    checkAuth();
  }, [loggedIn]);

  const doLogIn = async (credentials) => {
    console.log("in doLogIn of app.js");
    try {
      const user = await API.logIn(credentials);

      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: 'success' });
    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
      return "Not authorized";
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    //setCourses([]);
    //setExams([]);
  }
  return (
    <Router>
      {loggedIn ? <Redirect to="/" /> : ""}
      <MyNav loggedIn={loggedIn} doLogOut={doLogOut} doLogIn={doLogIn} />

      <Container fluid >
        <Switch>

          <Route exact path="/" render={() =>
            <Redirect to="/home" />}S
          />

          <Route path="/login" render={() =>
            <LoginForm login={doLogIn} />}
          />

          <Route path="/home" render={() =>
            <MyMain meme={meme} images={images} update={update} user={user} setMemes={setMemes} setImages={setImages} setUpdate={setUpdate} loggedIn = {loggedIn} setTempMeme={setTempMeme} />
          } />

          <Route path="/meme:id" render={() =>
            <MyMeme tempMeme={tempMeme} setMemeImage={setMemeImage} image={image}/>
          } />

        </Switch>
      </Container>
    </Router>
  );
}

export default App;