
import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LogoutButton, LoginForm } from './LoginComponents';
import { MyNav, MyMain, MyMeme, MyEdit } from './Components';
function App() {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in

  const doLogIn = async (credentials) => {/*
    console.log("in doLogIn of app.js");
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: 'success' });
    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
      return "Not authorized";
    }
  */}

  const doLogOut = async () => {/*
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    //setCourses([]);
    //setExams([]);
  */}
  return (
    <Router>

      <MyNav loggedIn={loggedIn} doLogOut={doLogOut} doLogIn={doLogIn} />

      <Container fluid >
        <Switch>

          <Route exact path="/" render={() =>
            <Redirect to="/home" />}
          />

          <Route path="/login" render={() =>
            <LoginForm login={doLogIn} />}
          />

          <Route path="/home" render={() =>
            <MyMain/>
          } />

          <Route path="/meme:id" render={() =>
            <MyMeme/>
          } />

          <Route path="/edit" render={() =>
            <MyEdit/>
          }/>

        </Switch>
      </Container>
    </Router>
  );
}

export default App;