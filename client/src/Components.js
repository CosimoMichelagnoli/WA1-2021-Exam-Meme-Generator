import { BrowserRouter as Router, Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { StrictMode, useEffect, useState } from 'react';
import { Navbar, Form, Nav, FormControl, ListGroup, Button, Col, Row, Modal, Container, Alert, Figure, DropdownButton, Dropdown } from 'react-bootstrap';
import { LogoutButton, LoginForm } from './LoginComponents';
import { logo_icon, trash_icon, copy_icon } from './icons';
import FigureCaption from 'react-bootstrap/esm/FigureCaption';
import { useHistory } from "react-router-dom";
import './images.css';
import Image from 'react-bootstrap/Image'

import Lisa from './memeImages/lisa.jpg';
import Obama from './memeImages/Obama.png';

import Ed_Edd_eddy from './memeImages/Ed_Edd_eddy.png';
import Squiddy from './memeImages/squiddy.jpg';

import Winnypooh from './memeImages/Winnypooh.jpg';
import Wow from './memeImages/Wow.jpg';


const selectImage = (name) => {
    let output = "imageError";
    switch (name) {
        case 'Lisa':
            output = Lisa;
            break;
        case 'Obama':
            output = Obama;
            break;
        case 'Ed_Edd_eddy':
            output = Ed_Edd_eddy;
            break;
        case 'Squiddy':
            output = Squiddy;
            break;
        case 'Winnypooh':
            output = Winnypooh;
            break;
        case 'Wow':
            output = Wow;
            break;
        default:
            output = 'imageError';
    }
    return output;
}

function MyNav(props) {

    return (
        <Navbar bg="dark" variant="dark" style={{ marginBottom: "1%" }}>
            <Navbar.Brand>
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
    const [newMod, setNewMod] = useState(true);

    const [id, setId] = useState((props.meme.length + 1));
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [imageID, setImageID] = useState('');
    const [font, setFont] = useState('');
    const [ntext, setNtext] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [protect, setProtect] = useState(false);
    const [creator, setCreator] = useState('');

    const [theRealC,setTheRealC] = useState(''); //for the ownership
    const [theRealP,setTheRealP] = useState(''); // for the visibility

    const newMeme = {
        id: id, title: title, imageID: imageID, color: color, font: font,
        ntext: ntext, text1: text1, text2: text2, text3: text3, protect: protect, creator: creator
    };
    
    useEffect(() => {
        async function loadMemes() {
            const response = await fetch('/api/allImages');
            const images = await response.json();

            props.setImages(images);
            if (props.user)
                setCreator(props.user.username);

        }
        loadMemes();
    }, []);
    useEffect(() => {
        async function loadMemes() {
            const response = props.loggedIn ? await fetch('/api/memes') : await fetch('/api/public/memes');
            const memes = await response.json();
            

            props.setMemes(memes);
            
            setId(memes.length + 1);
            if (props.user)
                setCreator(props.user.username);


        }
        loadMemes();
    }, [props.update]);
    useEffect(() => {
        async function loadMemes() {
            const response = props.loggedIn ? await fetch('/api/memes') : await fetch('/api/public/memes');
            const memes = await response.json();
            
            props.setMemes(memes);
            
            setId(memes.length + 1);
            if (props.user)
                setCreator(props.user.username);
        }
        loadMemes();
    }, [props.loggedIn]);
    return (
        <main className="mr-auto">
            <h1 align="center">Memes list</h1>

            <ListGroup className="list-group list-group-flush" >
                {props.meme.map((meme) => (<Memes key={meme.memeID} thisMeme={meme} setTheRealC={setTheRealC} setTheRealP={setTheRealP} setModalShow={setModalShow} setFlagUpdate={setFlagUpdate} {...props} />))/*user={props.user} setTempMeme={changeTemp} loggedIn={props.loggedIn}*/}
            </ListGroup>
            <Form inline className="mr-auto" >
                <span className="mr-auto"></span>
                {props.loggedIn ? <Button onClick={() => { setModalShow(true); setNewMod(true); setFlagUpdate(false);setCreator(props.user.username); }}>&#43;</Button> : ""}
            </Form>
            <MydModalWithGrid flagUpdate={flagUpdate} theRealC={theRealC} theRealP={theRealP} newMod={newMod} setNewMod={setNewMod} setFlagUpdate={setFlagUpdate} show={modalShow} newMeme={newMeme} setId={setId} setTitle={setTitle} setColor={setColor} setImageID={setImageID} setFont={setFont} setNtext={setNtext} setText1={setText1} setText2={setText2} setText3={setText3} setProtect={setProtect} setCreator={setCreator} onHide={() => setModalShow(false)} {...props} />

        </main>);
}

function MydModalWithGrid(props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(undefined);

    

    if (props.memeTemp) {
        async function loadImage() {
            const response = await fetch('/api/memes/images/' + props.memeTemp.imageID);
            const image = await response.json();
            document.getElementById("loadMemeImageModal").src = selectImage(image.name);
            setSelectedImage(image);
        }
        
        props.setId(props.memeTemp.id);
        props.setTitle(props.memeTemp.title);
        props.setColor(props.memeTemp.color);
        props.setImageID(props.memeTemp.imageID);
        props.setFont(props.memeTemp.font);
        props.setText1(props.memeTemp.text1);
        props.setText2(props.memeTemp.text2);
        props.setText3(props.memeTemp.text3);
        props.setProtect(props.memeTemp.protect);
        props.setCreator(props.user.username);
        loadImage();
        




        props.setMemeTemp(undefined);
        props.setFlagUpdate(true);
    } else if (props.newMod) {
        props.setId(id => id + 1);
        props.setTitle(d => d = '');
        props.setColor(d => d = '');
        props.setImageID(d => d = '');
        props.setFont(d => d = '');
        props.setText1(d => d = '');
        props.setText2(d => d = '');
        props.setText3(d => d = '');
        props.setProtect(d => d = false);
        props.setNewMod(false);
        
        

    }

    function select(eventKey, event) {
        event.preventDefault();
        document.getElementById("loadMemeImageModal").src = selectImage(eventKey);
        props.images.forEach(element => {
            if (element.name == eventKey) {
                setSelectedImage(element);
                props.setImageID(element.imageID);
            }

        });

    }
    function selectColor(eventKey, event) {
        event.preventDefault();
        props.setColor(eventKey);

    }
    function selectFont(eventKey, event) {
        event.preventDefault();
        props.setFont(eventKey);

    }



    const handleSumbit = (event) => {
        console.log("ma è possibile? "+props.theRealP);

        if (props.newMeme.title === '' || (props.newMeme.text1 === '' && props.newMeme.text2 === '' && props.newMeme.text3 === '') || props.newMeme.imageID === '' || props.user === undefined) {
            setErrorMessage('Error(s) in the modal, please add missing form(s).');
        } else {
            props.setCreator(props.user.username);
            props.setNtext(selectedImage.ntext);
            setErrorMessage('');
            if (props.flagUpdate) {

                props.setFlagUpdate(false);
            }

            props.addMeme(props.newMeme);


            props.setId(id => id + 1);
            props.setTitle(d => d = '');
            props.setColor(d => d = '');
            props.setImageID(d => d = '');
            props.setFont(d => d = '');
            props.setText1(d => d = '');
            props.setText2(d => d = '');
            props.setText3(d => d = '');
            props.setProtect(d => d = false);
            setErrorMessage('');

            props.onHide();
        }

    }
    return (
        <Modal size="lg"  {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new meme
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {errorMessage !== '' ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                    <Row>
                        <Col md={8} lg={8}>
                            <Image id="loadMemeImageModal" style={{
                                width: '500px',
                                height: '300px'
                            }} fluid />
                            <FigureCaption className={selectedImage ? selectedImage.position1 + " " + props.newMeme.color + " " + props.newMeme.font : ""} >
                                {props.newMeme.text1 != "" ? props.newMeme.text1 : ""}
                            </FigureCaption>
                            <FigureCaption className={selectedImage ? selectedImage.position2 + " " + props.newMeme.color + " " + props.newMeme.font : ""} >
                                {props.newMeme.text2 != "" ? props.newMeme.text2 : ""}
                            </FigureCaption>
                            <FigureCaption className={selectedImage ? selectedImage.position3 + " " + props.newMeme.color + " " + props.newMeme.font : ""} >
                                {props.newMeme.text3 != "" ? props.newMeme.text3 : ""}
                            </FigureCaption>
                        </Col>
                        <Col md={2} lg={3}>
                            {props.flagUpdate ? "" : <DropdownButton id="dropdown-basic-button" className="mr-auto" title="Source image">
                                {props.images.map((image) => (<Dropdown.Item key={image.imageID} eventKey={image.name} onSelect={select}>
                                    {image.name}
                                </Dropdown.Item>))}
                            </DropdownButton>}
                            {selectedImage ?
                                <Row>
                                    <Form>
                                        <Form.Group >
                                            <Form.Label>Text1</Form.Label>
                                            <Form.Control type="text" placeholder="Enter description" value={props.newMeme.text1} onChange={ev => { props.setText1(ev.target.value) }} onKeyPress={event => {

                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    //handleSumbit(); props.onHide();
                                                }
                                            }} />
                                        </Form.Group >
                                        {selectedImage.ntext > 1 ? <Form.Group >
                                            <Form.Label>Text2</Form.Label>
                                            <Form.Control type="text" placeholder="Enter description" value={props.newMeme.text2} onChange={ev => { props.setText2(ev.target.value) }} onKeyPress={event => {

                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    //handleSumbit(); props.onHide();
                                                }
                                            }} />
                                        </Form.Group > : ""}
                                        {selectedImage.ntext > 2 ? <Form.Group >
                                            <Form.Label>Text3</Form.Label>
                                            <Form.Control type="text" placeholder="Enter description" value={props.newMeme.text3} onChange={ev => { props.setText3(ev.target.value) }} onKeyPress={event => {

                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    //handleSumbit(); props.onHide();
                                                }
                                            }} />
                                        </Form.Group >
                                            : ""}

                                    </Form>
                                </Row> : ""
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3} lg={3}>
                            <Form>

                                <Form.Group controlid="formDescription">
                                    <Form.Label>Meme title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" value={props.newMeme.title} onChange={ev => { props.setTitle(ev.target.value) }}
                                        onKeyPress={event => {

                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                //handleSumbit(); props.onHide();
                                            }
                                        }} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={3} lg={3}>
                            <Form.Group>
                                <Form.Label>Text color</Form.Label>
                                <DropdownButton title="Select" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="yellow" onSelect={selectColor}>Yellow</Dropdown.Item>
                                    <Dropdown.Item eventKey="white" onSelect={selectColor}>White</Dropdown.Item>
                                    <Dropdown.Item eventKey="black" onSelect={selectColor}>Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="red" onSelect={selectColor}>Red</Dropdown.Item>

                                </DropdownButton>
                            </Form.Group>
                        </Col>
                        <Col md={3} lg={3}>
                            <Form.Group>
                                <Form.Label>Text font</Form.Label>
                                <DropdownButton title="Select" id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey="timesNewRoman" onSelect={selectFont}>Times New Roman</Dropdown.Item>
                                    <Dropdown.Item eventKey="arial" onSelect={selectFont}>Arial</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={6} md={4}>
                            {props.user ?props.flagUpdate?(props.user.username === props.theRealC || !props.theRealP) ?<Form.Check type="checkbox" id={`Protect`} label={`Protected`} checked={props.newMeme.protect} onChange={ev => { props.setProtect(ev.target.checked); }} />:"":<Form.Check type="checkbox" id={`Protect`} label={`Protected`} checked={props.newMeme.protect} onChange={ev => { props.setProtect(ev.target.checked); }} /> :""}
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

function Memes(props) {
    const thisMeme = props.thisMeme;
    
    return (
        <ListGroup.Item className="d-flex w-100 justify-content-center">
            <Container fluid>
                <Row>
                    <Col xs={3} sm={2} md={3} lg={3} xl={3} >
                        <NavLink to={'/meme' + props.thisMeme.memeID} onClick={() => { props.setMemeTemp(props.thisMeme); }}> {props.thisMeme.title} </NavLink>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={3}>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} xl={3}>
                    </Col>
                    <Col align="right" xs={3} sm={3} md={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 1 }} xl={{ span: 2, offset: 1 }}>
                        {props.loggedIn ? <span onClick={() => { props.setMemeTemp(props.thisMeme);props.setTheRealC(props.thisMeme.creator);props.setTheRealP(props.thisMeme.protect); props.setModalShow(true); props.setFlagUpdate(true); }}>{copy_icon}</span> : ""}
                        {'  '}
                        {props.loggedIn ? props.user.username == thisMeme.creator ? <span onClick={() => { props.deleteMeme(props.thisMeme.memeID); }} >{trash_icon}</span> : "" : ""}
                    </Col>
                </Row>
            </Container>

        </ListGroup.Item >);

}

function MyMeme(props) {
    const history = useHistory();
    useEffect(() => {

        async function loadMemeImage() {
            const response = await fetch('/api/memes/images/' + props.memeTemp.imageID);
            const image = await response.json();
            props.setMemeImage(image);
            document.getElementById("loadMemeImage").src = selectImage(image.name);
        }

        loadMemeImage();

    }, []);
    
    function back(e) {
        e.preventDefault();
        props.setMemeTemp(undefined);
        history.push("/");
    }
    return (<Row>
        <Col>
            <Container>
                <Figure className="position-relative" >
                    <Image id="loadMemeImage" style={{
                        width: '700px',
                        height: '500px'
                    }} fluid />
                    <FigureCaption className={'' + props.image.position1 + ' ' + props.memeTemp.font + ' ' + props.memeTemp.color} >
                        {props.memeTemp.text1 ? props.memeTemp.text1 : ""}
                    </FigureCaption>
                    <FigureCaption className={'' + props.image.position2 + ' ' + props.memeTemp.font + ' ' + props.memeTemp.color} >
                        {props.memeTemp.text2 ? props.memeTemp.text2 : ""}
                    </FigureCaption>
                    <FigureCaption className={'' + props.image.position3 + ' ' + props.memeTemp.font + ' ' + props.memeTemp.color} >
                        {props.memeTemp.text3 ? props.memeTemp.text3 : ""}
                    </FigureCaption>
                </Figure>
            </Container>
        </Col>
        <Col>
            <Container className="mr-auto">
                <h1>{props.memeTemp.title}</h1>
                <p>{"Author: "+props.memeTemp.creator}</p>
                <p>State: {props.memeTemp.protect?"protected":"public"}</p>
            </Container>
            <div style={{ marginTop: "50%" }}>
                <Button variant="outline-dark" onClick={back}>Back to list</Button>
            </div>
        </Col>
    </Row>);
}

export { MyNav, MyMain, MyMeme };