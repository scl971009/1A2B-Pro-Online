import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import HeadingStyle from './headingStyle';
import SelectionAreaStyle from './selectionAreaStyle';
import HoodRowStyle from './hoodRowStyle';
import HoodCellStyle from './hoodCellStyle';
import FooterStyle from './footerStyle';
import { COLOURS, BOARD_HEIGHT, BOARD_WIDTH } from '../../config';
import Modal from '../Modal';
import Row from '../Row';
import Peg from '../Peg';
import { clearRow, newGame } from '../../actions';
import { startPlaySelf } from '../../utils/selfPlayUtils';
import './Game.css';

class PVP extends Component {
  handleClearRowButtonClick = () => {
    const {
      clearRow,
      turn,
    } = this.props
    clearRow(turn);
  }

  handleNewGameButtonClick = () => {
    const { newGame } = this.props;
    newGame();
  }

  handlePlaySelfButtonClick = () => {
    startPlaySelf();
  }
  render() {
    const {
      boardState,
      results,
      code,
      turn,
      gameEnded,
      showEndGameModal,
    } = this.props;
    console.log(localStorage.useraccount)
    /*console.log(boardState)
    console.log(results)
    console.log(code)
    console.log(showEndGameModal)*/
    const youLost = turn >= BOARD_HEIGHT &&
                    !_.isEqual(results[BOARD_HEIGHT-1], Array.apply(null , {length: BOARD_WIDTH}).map(()=>'red'));
    return (
      <div className="container">
        <div className="text-center body">
          <HeadingStyle>1A2B Pro</HeadingStyle>
          <div className="board-container">
            <table className="board" data-intro="Try to guess the hidden pattern in under 10 tries" data-position="left">
              <tbody>
                <HoodRowStyle gameEnded={gameEnded}>
                  <td>&nbsp;</td>
                  {code.map((peg, index) => (
                    <HoodCellStyle gameEnded={gameEnded} key={`code-${index}`}>
                      {!gameEnded ? ' ' : <Peg colour={peg} />}
                    </HoodCellStyle>
                  ))}
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </HoodRowStyle>
                {boardState.map((row, index) => (
                  <Row
                    index={index + 1}
                    pegs={row}
                    rowResults={results[index]}
                    turn={turn}
                    activeRow={turn === index}
                    key={index}
                  />
                ))}
              </tbody>
            </table>

            <SelectionAreaStyle data-intro="Select pegs by clicking on them" data-position="left">
              {COLOURS.map(colour => (
                <Peg colour={colour} key={`selection-${colour}`} clickable />
              ))}
              <button
                type="button"
                name="clear"
                className="btn btn-default btn-xs btn-block"
                onClick={this.handleClearRowButtonClick}
                disabled={gameEnded}
              >
                Clear Current Row
              </button>
            </SelectionAreaStyle>

          </div>

          <div className="well center-block">
            <button
              type="button"
              name="newGame"
              className="btn btn-primary btn-block"
              onClick={this.handleNewGameButtonClick}
            >
              New Game
            </button>
            {/* <button
              type="button"
              name="play-self"
              className="btn btn-success btn-block"
              data-intro="Have the computer think for you 🤖"
              data-position="left"
              onClick={this.handlePlaySelfButtonClick}
            >
              Play Self
            </button> */}
            {/* <button type="button" name="help" className="btn btn-default btn-block">Help</button> */}
          </div>

          <Modal
            show={showEndGameModal}
            win_or_loss = {youLost}
            title={youLost ? 'Game Over' : 'You win'}
            content={youLost ?
              <p>You did not win <span role="img" aria-label="thumbs up">😟</span></p> :
              <p>Congrats! You won in {turn + 1} turns <span role="img" aria-label="thumbs up">👍🏻</span></p>
            }
            useracount = {localStorage.useracount}
          />
        </div>
        <FooterStyle>&copy; Dave Petrasovic</FooterStyle>
      </div>
    );
  }
}
const mapStateToProps = (state /*, ownProps*/) => {
  return state;
}

const mapDispatchToProps = { clearRow, newGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PVP);