import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  Navbar  from '../../Navbar.js';
import  Game   from '../Pages/Game.js';
import  Home   from '../Pages/Home.js';
import  Login   from '../Pages/Login.js';
import Profile from '../Pages/Profile.js';

import './App.css';
import Registration from '../Pages/Registration.js';
 
class App extends Component {

/*
  checkLoginStatus(){
    axios.get("", {withCredentials: true})
    .then(response =>{
      console.log("logged in?", response);
    })
    .catch(error =>{
      console.log("check login error", error);
    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }

*/
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
          path="/login"
          exact
          /*
          render={props =>(
            <Login { ... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
          )}
          */
          component={Login}
        />
        <Route exact path="/game" component={Game} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/profile" component={Profile} />
      </div>
      </Router>
    );
  }
}

export default App;

