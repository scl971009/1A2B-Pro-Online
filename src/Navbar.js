import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';


class Home extends Component {

  logOut(e){
    e.preventDefault()
    localStorage.removeItem('usertoken')
    console.log(this.props)
    this.props.history.push('/login')
  }
  render(){
    const loginRegLink = (
      <ul className="navbar-nav">
      <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">
                Game
              </Link>
            </li>
            <li className="nav-item:">
            <Link className="nav-link" to="/registration">
            Registration
          </Link>
      </li>
      </ul>
    )
  
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
            <Link to="/profile" className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <a href="" onClick={this.logOut.bind(this)} className="nav-link">
              Logout
            </a>
          </li>
  
      </ul>
  
    )
  
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
  
  
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
  
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {localStorage.usertoken ? userLink : loginRegLink}
            
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/electronics"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ???
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/electronics/mobile">
                  Mobile Phone
                </Link>
                <Link className="dropdown-item" to="/electronics/desktop">
                  Desktop PC
                </Link>
                <Link className="dropdown-item" to="/electronics/laptop">
                  Laptop
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
}

export default withRouter(Home)
