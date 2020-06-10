import React, { Component } from 'react';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	win: "Please Wait",
    	lose: "Please Wait"
    };
  }
  
  getpwd = () => {
    fetch('/get_login/account1').then(res => res.json()).then(data => {
      console.log(data.password);
      this.setState({
	      win: data.password,
	      lose: data.password
	  });
    });
  }

  render() {
    this.getpwd();
    return (
      <div className="container">
        <h1 className="py-3">Profile</h1>
        <p> Win: {this.state.win}</p>
        <p> Lose: {this.state.lose}</p>
      </div>
    );
  }
}

export default Profile;