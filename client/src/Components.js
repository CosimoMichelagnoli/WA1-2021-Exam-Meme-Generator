import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar, Form, Nav, FormControl, ListGroup, Button, Col, Row, Modal, Container, Alert, Figure, DropdownButton, Dropdown } from 'react-bootstrap';
import { LogoutButton, LoginForm } from './LoginComponents';
import { logo_icon, trash_icon, copy_icon, meme1l, meme2l, meme3l } from './icons';
import FigureCaption from 'react-bootstrap/esm/FigureCaption';


const styleHighTextmeme1_2l = { position: "absolute", bottom: "67%", left: "7%", width: "30%" };
const styleLowTextmeme1_2l = { position: "absolute", bottom: "25%", left: "7%", width: "30%" };
const styleHighTextmeme3l = { position: "absolute", bottom: "67%", left: "51%", width: "30%" };
const styleLowTextmeme3l = { position: "absolute", bottom: "25%", left: "51%", width: "30%" };
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
    const [modalShow, setModalShow] = useState(false);
    const [flagUpdate, setFlagUpdate] = useState(false);
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [taskTemp, setTaskTemp] = useState(false);
    const [date, setDate] = useState(undefined);
    const [important, setImportant] = useState(false);
    const [id, setId] = useState(props.meme.length + 1);
    const changeTemp = (t) => {
        setTaskTemp(t);
    }
    return (
        <main className="mr-auto">
            <h1 align="center">Memes list</h1>

            <ListGroup className="list-group list-group-flush" >
                <Memes />
                <Memes />
                {/*props.tasks.map((task) => (<MyTask temp={taskTemp} setTaskTemp={changeTemp} modal={setModalShow} updateTask={props.updateTask} deleteTask={props.deleteTask} key={task.id} task={task} />))*/}
            </ListGroup>
            <Form inline className="mr-auto" >
                <span className="mr-auto"></span>
                <Button onClick={() => setModalShow(true)}>&#43;</Button>
            </Form>
            <MydModalWithGrid flagUpdate={flagUpdate} setFlagUpdate={setFlagUpdate} show={modalShow} description={description} setDescription={setDescription} privacy={privacy} setPrivacy={setPrivacy} date={date} setDate={setDate} important={important} setImportant={setImportant} id={id} setId={setId} onHide={() => setModalShow(false)} temp={taskTemp} setTaskTemp={changeTemp} {...props} />

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
                <Figure className="position-relative" font="comi">
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
function MydModalWithGrid(props) {

    const [errorMessage, setErrorMessage] = useState('');

    if (props.temp) {
        props.setDescription(props.temp.description);
        props.setPrivacy(props.temp.private);

        props.setDate(props.temp.deadline);
        props.setImportant(props.temp.important);
        props.setId(props.temp.id);


        props.setTaskTemp(false);
        props.setFlagUpdate(true);

    }
    const handleSumbit = (event) => {
        const task = { id: props.id, description: props.description, important: props.important, private: props.privacy, deadline: props.date };
        if (props.description === '') {
            setErrorMessage('Error(s) in description, please fix it.');
        } else {
            setErrorMessage('');
            if (props.flagUpdate) {
                props.updateTask(task);

                props.setFlagUpdate(false);

                props.setId(id => id + 1);
                props.setDescription(d => d = '');
                props.setDate(d => d = undefined);
                props.setImportant(d => d = false);
                props.setPrivacy(d => d = false);
                props.onHide();
            }
            else {
                props.addTask(task);





                props.setId(id => id + 1);
                props.setDescription(d => d = '');
                props.setDate(d => d = undefined);
                props.setImportant(d => d = false);
                props.setPrivacy(d => d = false);

                props.onHide();

            }
        }

    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new meme
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {errorMessage !== '' ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                    <Row>
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Group controlid="formDescription">
                                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                        <Dropdown.Item href="#/action-1">meme1</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">meme2</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">meme3</Dropdown.Item>
                                    </DropdownButton>
                                    <Form.Label>Meme title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter description" value={props.description} onChange={ev => { props.setDescription(ev.target.value); }}
                                        onKeyPress={event => {

                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                handleSumbit(); props.onHide();
                                            }
                                        }} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={6} md={4}>
                            <Form.Check type="checkbox" id={`Protected`} label={`Protected`} checked={props.privacy} onChange={ev => { props.setPrivacy(ev.target.checked) }} />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { handleSumbit() }} >Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export { MyNav, MyMain, MyMeme };