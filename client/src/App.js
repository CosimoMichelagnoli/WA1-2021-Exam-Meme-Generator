
import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { logo_icon } from './icons';
import { LogoutButton, LoginForm } from './LoginComponents';
import { MyNav } from './Components';
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

     <MyNav  loggedIn={loggedIn} doLogOut={doLogOut}/>

      <Container fluid >
        <Switch>
          
            <Route exact path="/" render={() =>  loggedIn ? <Redirect to="/main" /> : <LoginForm login={doLogIn} /> } />

            <Route path="/main" render={() =>
              <p>FUNZIONI?</p>
            } />
            <Route path="/portal" render={() =>
              <p>FUNZIONI?</p>
            } />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;