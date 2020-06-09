import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { Navbar } from '../../Navbar.js';
import  Game   from '../Pages/Game.js';
import  Home   from '../Pages/Home.js';
import  Login   from '../Pages/Login.js';

import './App.css';
 
class App extends Component {
  constructor(){
    super();

    this.state={
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  checkLoginStatus(){
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <Route 
          path="/" 
          exact 
          render={props => (
            <Home { ... props} loggedInStatus={this.state.loggedInStatus} />
          )}
        />
        <Route 
          path="/login"
          exact
          render={props =>(
            <Login { ... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
          )}
        />
        <Route path="/game" component={Game} />
      </div>
    );
  }
}

export default App;