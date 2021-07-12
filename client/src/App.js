
import './App.css';
import { useState, useEffect } from "react";
import API from "./API";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import  {LoginForm}  from './LoginComponents';
import { MyNav, MyMain, MyMeme} from './Components';
function App() {
  const [loggedIn, setLoggedIn] = useState(false); // at the beginning, no user is logged in
  const [memes, setMemes] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(undefined);

  const [update, setUpdate] = useState(0);
  const [memeTemp, setMemeTemp] = useState('');
  const [image, setMemeImage] = useState('');
  
  useEffect(() => {
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
    try {
      const user = await API.logIn(credentials);
      setUser(user);

      setLoggedIn(true);
    } catch (err) {
      return "Not authorized";
    }
  }

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
  }

  const addMeme = (newMeme) => {
    API.createMeme(newMeme);
    setUpdate((before) => before + 1);
  }
  const deleteMeme = (id) => {
    API.deleteMeme(id);
    setUpdate((before) => before + 1);
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
            <MyMain meme={memes} images={images} update={update} user={user} setMemes={setMemes} 
            setImages={setImages} setUpdate={setUpdate} loggedIn = {loggedIn} memeTemp={memeTemp} setMemeTemp={setMemeTemp}
            addMeme={addMeme} deleteMeme={deleteMeme} />
          } />

          <Route path="/meme:id" render={() =>
            <MyMeme memeTemp={memeTemp}setMemeTemp={setMemeTemp} setMemeImage={setMemeImage} image={image}/>
          } />

        </Switch>
      </Container>
    </Router>
  );
}

export default App;