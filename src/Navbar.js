import React, {Component} from 'react';
import { Link, withRouter ,Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(){
    super()
  }
  state = {
    error: null,
    gameId: null,
    waiting: false,
    whiteId: null,
  }
  logOut(e){
    e.preventDefault()
    localStorage.removeItem('usertoken')
    console.log(this.props)
    this.props.history.push('/login')
  }
  createGame = () => {
    const { user } = this.props;
    const data = {
      userId: localStorage.useracount,
    };
    console.log({ user })
    console.log(data)
    /* this.socket.emit('CREATE_GAME', data);
    this.setState({ waiting: true }, () => {
      setTimeout(() => {
        this.socket.on('RECEIVE_GAME', (game) => {
          this.receiveGame(game);
        });
      }, 500);
      this.stopWaiting = setTimeout(() => {
        this.socket.removeListener('RECEIVE_GAME');
        this.setState({
          error: 'Could not find an opponent at this time',
          waiting: false,
        });
        setTimeout(() => {
          this.setState({ error: null });
        }, 2000);
      }, 10000);
    }); */
  }
  receiveGame = (game) => {
    clearTimeout(this.stopWaiting);
    this.setState({ waiting: false }, () => {
      this.socket.removeListener('RECEIVE_GAME');
      this.socket.emit('JOIN_GAME', game);
    });
    this.setState({
      gameId: game.id,
      whiteId: game.userId,
    });
  }
  render(){
    const {
      error,
      gameId,
      waiting,
      whiteId,
    } = this.state;
    const redirect = gameId ? <Redirect to={`/game/${gameId}`} /> : null;
    const buttonText = waiting ? 'Looking for Opponent' : 'Find Opponent';
    const errorMessage = error ?(<p style={{ color: 'red' }}>{error}</p>) : null;
    const loginRegLink = (
      <ul className="navbar-nav">
      <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
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
              <Link className="nav-link" to="/game">
                Game
              </Link>
            </li>
          <li className="nav-item">
          <Link className="nav-link" to="/game_pvp">
          Multiple player
              </Link>
          </li>
          <li className="nav-item">
            <a href="" onClick={this.logOut.bind(this)} className="nav-link">
              Logout
            </a>
          </li>
          <li className="nav-item">
              <Link to="/game" className="nav-link" >
                Game
              </Link>
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
