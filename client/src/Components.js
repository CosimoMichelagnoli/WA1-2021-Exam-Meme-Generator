import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Navbar, Form, Nav, FormControl, ListGroup, Button, Col, Row, Modal, Container, Alert, Figure } from 'react-bootstrap';
import { LogoutButton, LoginForm } from './LoginComponents';
import { logo_icon, trash_icon, copy_icon, meme1l, meme2l, meme3l } from './icons';
import FigureCaption from 'react-bootstrap/esm/FigureCaption';

const styleHighTextmeme1_2l = { position: "absolute",bottom: "67%", left: "7%", width:"30%" };
const styleLowTextmeme1_2l = { position: "absolute",bottom: "25%", left: "7%", width:"30%" };
const styleHighTextmeme3l = { position: "absolute",bottom: "67%", left: "51%", width:"30%" };
const styleLowTextmeme3l = { position: "absolute",bottom: "25%", left: "51%", width:"30%" };
function MyNav(props) {

    return (
        <Navbar bg="dark" variant="dark" style={{ marginBottom: "1%" }}>
            <Navbar.Brand href="/">
                <p style={{ margin: "0px" }}>{logo_icon}  <font size="6" >Meme Generator</font></p>
            </Navbar.Brand>
            <Nav className="mr-auto">

            </Nav>
            <Form inline>
                {props.loggedIn ? <LogoutButton doLogOut={props.doLogOut} /> : <Button variant="outline-light" href="/login" >Login</Button>}
            </Form>


            {/* <Button variant="primary" type="submit" size="md" > Logout </Button> */}
        </Navbar>);
}

function MyMain(props) {
    return (
        <main className="mr-auto">
            <h1 align="center">Memes list</h1>

            <ListGroup className="list-group list-group-flush" >
                <Memes />
                <Memes />
                {/*props.tasks.map((task) => (<MyTask temp={taskTemp} setTaskTemp={changeTemp} modal={setModalShow} updateTask={props.updateTask} deleteTask={props.deleteTask} key={task.id} task={task} />))*/}
            </ListGroup>



        </main>);
}

function Memes(props) {
    return (
        <ListGroup.Item className="d-flex w-100 justify-content-center">
            <Container fluid>
                <Row>
                    <Col xs={3} sm={2} md={3} lg={3} xl={3} >
                        <NavLink to="/meme1"> Meme 1 </NavLink>
                        {/*<Form.Check type="checkbox" id={`check-t${props.task.id}`} className={props.task.important ? "important" : ""} label={props.task.description} checked={completed} onChange={ev => { setCompleted(ev.target.checked); API.completeTask({ id: props.task.id, completed: ev.target.checked ? 1 : 0 }) }} />*/}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={3}>
                        {/*<small>{props.task.private ? private_icon : ""}</small>*/}
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={3}>

                        {/*<small>{props.task.deadline === undefined || props.task.deadline === null ? "" : `${dayjs(props.task.deadline).format("MMM D, YYYY")}`}</small>*/}
                    </Col>
                    <Col align="right" xs={3} sm={3} md={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
                        <span /*onClick={() => { props.setTaskTemp(props.task); props.modal(true); }}*/>{copy_icon}</span>
                        {'  '}
                        <span /*onClick={() => { props.deleteTask(props.task.id); }}*/ >{trash_icon}</span>
                    </Col>
                </Row>
            </Container>

        </ListGroup.Item>);

}

function MyMeme(props) {
    return (<Row>
        <Col>
            <Container>
                <Figure className="position-relative">
                    {meme1l}
                    <FigureCaption style={styleHighTextmeme1_2l} >
                        Marameo ajckdksnavkjavjnakjcn akjcbakjvnajvlasjdbv
                    </FigureCaption>
                    <FigureCaption style={styleLowTextmeme1_2l} >
                        Marameo ajvncdsak jlvnkalsjvnklaj
                    </FigureCaption>
                </Figure>
            </Container>
        </Col>
        <Col>
            <Container className="mr-auto">
                <h1>Title meme</h1>
                <p>Author</p>
            </Container>
            <div style={{ marginTop: "50%" }}>
                <Button variant="outline-dark" href="/">Back to list</Button>
            </div>
        </Col>
    </Row>);
}
function MyEdit(props){
    return(<h1>Dio fa</h1>);
}
export { MyNav, MyMain, MyMeme, MyEdit };