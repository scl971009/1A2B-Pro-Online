import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '../../Navbar.js';
import  Game   from '../Pages/Game.js';
import  Home   from '../Pages/Home.js';
import  Login   from '../Pages/Login.js';
import  Profile   from '../Pages/Profile.js';


import './App.css';



class App extends Component {
  

  render() {
    return (
      <div className="container">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/game" component={Game} />
        <Route path="/profile" component={Profile} />

      </div>
    );
  }
}

export default App;