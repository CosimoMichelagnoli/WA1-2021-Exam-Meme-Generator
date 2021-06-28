import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Navbar } from 'react-bootstrap'
import { LogoutButton, LoginForm } from './LoginComponents';
import { logo_icon } from './icons';

function MyNav(props) {

    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom:"3%"}}>
            <Navbar.Brand href="/">
              <p style={{margin: "0px"}}>{logo_icon}  <font size= "6" >Meme Generator</font></p>
            </Navbar.Brand>
            {props.loggedIn ? <LogoutButton doLogOut={props.doLogOut} /> : <Redirect to="/" />}
            {/* <Button variant="primary" type="submit" size="md" > Logout </Button> */}
        </Navbar>);
}

export { MyNav };