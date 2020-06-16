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

    this.socket.on('connect', () => {
      console.log('CONNECT');
      this.socket.emit('connection', {'data': 'Hello Server'});
    });

    this.socket.on('server_response', (data) => {
      console.log('[Socket on] recv from server: ', data['data']);
    });

    // TODO: this is a bug
    this.socket.on('START_GAME', (game) => {
      // this.receiveGame(game);
      console.log('[Socket] START_GAME');
      var storage=window.localStorage;
      console.log(storage);
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
    this.socket.on('RECEIVE_GAME', (game) => {
      console.log('[Socket] RECEIVE_GAME');
      this.receiveGame(game);
    });
  }

  receiveGame = (game) => {
    
    console.log(game)
    this.socket.removeListener('RECEIVE_GAME');
    this.socket.emit('JOIN_GAME', game);

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
        {redirect}
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

const mapStateToProps = state => ({
  user: state.userreducer.user,
});

const mapDispatchToProps = dispatch => ({
  addGame: (game) => {
    const action = { type: 'ADD_GAME', game };
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
