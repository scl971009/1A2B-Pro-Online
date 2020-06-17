import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  Navbar  from '../../Navbar.js';
import  Game   from '../Pages/Game.js';
import  Game_PVP   from '../Pages/Game_PVP.js';
import  Home   from '../Pages/Home.js';
import  Login   from '../Pages/Login.js';
import  Profile   from '../Pages/Profile.js';

import './App.css';
import Registration from '../Pages/Registration.js';
 
class App extends Component {

  render() {
    return (
      <Router>
      <div className="container">
        <Navbar />
        <Route 
          path="/" 
          exact 
          component={Home}
          /*
          render={props => (
            <Home { ... props} loggedInStatus={this.state.loggedInStatus} />
          )}
          */
        />
        <Route 
          path="/profile" 
          exact 
          component={Profile}
          /*
          render={props => (
            <Home { ... props} loggedInStatus={this.state.loggedInStatus} />
          )}
          */
        />
        <Route 
          path="/login"
          exact
          /*
          render={props =>(
            <Login { ... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
          )}
          */
          component={Login}
        />
        <Route path="/game" component={Game} />
        <Route path="/game_pvp" component={Game_PVP} />
        <Route path="/registration" component={Registration} />
      </div>
      </Router>
    );
  }
}

export default App;

