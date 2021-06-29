import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap';
import { useState } from 'react';



function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    function notValidEmail(mail) {
      if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(mail)) {
        return (false)
      }
      return (true)
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrorMessage('');
      const credentials = { username, password };
      const notValidFormEmail=notValidEmail(username);
      let valid = true;
      if (username === '' || password === '' || password.length < 6 || notValidFormEmail)
        valid = false;
  
      if (valid) {
        const temp = await props.login(credentials);
  
  
        if (temp === "Not authorized") {
  
          setErrorMessage('Invalid username or password');
  
        };
  
      }
      else {
        // show a better error message...
        let msg;
        if(username==='')
          msg='Email is empty';
        if(notValidFormEmail)
          msg='Email format is not valid';
        if(password.length<6)
          msg='Password cannot be shorter than 6';
        setErrorMessage(msg);
      }
    };
  
    return (
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
          </Form>
        </Col>
      </Row>)
  }

  function LogoutButton(props) {
    return (
      <Col>
        <Button variant="outline-light" onClick={() => { props.doLogOut() }}>Logout</Button>
      </Col>
    )
  }
  
  export { LoginForm, LogoutButton };