
import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { logo_icon } from './icons';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  return (
    <Router>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
      React Bootstrap
    </Navbar.Brand>
        {loggedIn ? <Button variant="primary" type="submit" size="md" > Logout </Button> : <Redirect to="/" />}
      </Navbar>
      <Container fluid >
        <Switch>
          
            <Route exact path="/" render={() =>
              <>
                {' '}
                <Row className="justify-content-center">
                  <Col xs={5} sm={5} md={3} lg={3} xl={3} >
                    <Form className='below-nav'>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.</Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <div className="mb-2">
                        <Button variant="primary" type="submit">
                          Submit </Button>
                      </div>
                      <div>
                        <Button variant="secondary" type="submit" size="md">
                          Check out the memes!              </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </>
            } />

            <Route path="/surveys" render={() =>
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