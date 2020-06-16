import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

import data from '../Assets/data';

const { baseAPI } = data;

class Home extends Component {
  // constructor(props){
  //     super(props);
  // }

  state = {
    error: null,
    gameId: null,
    waiting: false,
    opponentId: null,
  }

  componentDidMount() {

    this.socket = io(baseAPI, {secret:true});
    console.log('gameID = ', this.state.gameId)

    this.socket.on('connect', () => {
      console.log('CONNECT')
      if (this.state.gameId === null) {  /* TODO */
        this.socket.emit('connect_event', {data: 'connected!', rand: Math.floor(Math.random() * 800000) + 100000});
      }
    });

    this.socket.on('server_response', (data) => {
      this.setState({
        gameId: data.gameid,
      });

      console.log('[Socket on] recv from server: ', this.state.gameId);
    });

    // // TODO: this is a bug
    this.socket.on('CREATE_GAME', (game) => {
      this.receiveGame(game);
      console.log('[Socket] CREATE_GAME');
    });
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.close();
  }

  createGame = () => {
    const { user } = this.props;
    const data = {
      userId: 'f4t',
      username: 'fat',
    };

    this.socket.emit('CREATE_GAME', data);
    this.setState({ waiting: true }, () => {
      setTimeout(() => {
        this.socket.on('RECEIVE_GAME', (game) => {
          this.receiveGame(game);
          console.log('[Socket] RECEIVE_GAME');
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
    });
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

  render() {
    
    const {
      error,
      gameId,
      waiting,
      opponentId,
    } = this.state;

    const { user } = this.props;

    const redirect = gameId ?
      <Redirect to={`/game/${gameId}?start_id=${opponentId}`} />
      :
      null;

    const buttonText = waiting ? 'Looking for Opponent' : 'Find Opponent';
    const errorMessage = error ?
      (
        <p style={{ color: 'red' }}>{error}</p>
      ) : null;

    return (
      <div className="container">
        <h1 className="py-3">Home</h1>
        <h1>WELCOME</h1>
        <button
          disabled={waiting}
          onClick={this.createGame}
        >
          {buttonText}
        </button>
        {errorMessage}
      </div>
    );
  }
}

export default Home;
