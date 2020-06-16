import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultsCellStyle from './resultsCellStyle';
import PetCellStyle from './pegCellStyle';
import { placePeg, incrementTurn, checkRow, endGame } from '../../actions';
import Peg from '../Peg';
import Results from '../Results';
import { BOARD_HEIGHT } from '../../config';

class Row extends Component {
  renderPegs = (pegs) => {
    const { index } = this.props;
    const jsxPegs = [];
    for (let i=0; i<pegs.length; i+=1) { // .map does not iterate through empty arrays
      jsxPegs.push((
        <PetCellStyle key={`${index}-${i}`}>
          {pegs[i] && <Peg colour={pegs[i]} />}
        </PetCellStyle>
      ));
    }
    return jsxPegs;
  }

  hanldeRowCheckClick = () => {
    console.log(this.props.code);
    const {
      incrementTurn,
      endGame,
      checkRow,
      pegs,
      code,
      turn,
    } = this.props;
    const result = checkRow(pegs).result.result;
    const r = checkRow(pegs).result.r;
    if(
      result.length===code.length &&
      'red' === result.reduce((previous, current) => (previous===current) ? previous : NaN)
    ) {
      endGame();
    } else {
      incrementTurn();
      if (turn >= BOARD_HEIGHT - 1) {
        endGame();
      }
    }
  }

  render() {
    const {
      index,
      pegs,
      rowResults,
      activeRow,
      gameEnded
    } = this.props;

    return (
      <tr>
        <td>{index}</td>
        {this.renderPegs(pegs)}
        <ResultsCellStyle>
          <Results rowResults={rowResults} index={index} />
        </ResultsCellStyle>
        <td>
          {activeRow && <button
            className="btn btn-default btn-xs"
            disabled={!pegs[pegs.length-1] || gameEnded}
            onClick={this.hanldeRowCheckClick}>
              Check
            </button>
          }
        </td>
      </tr>
    );
  }
};

const mapStateToProps = (state /*, ownProps*/) => {
  return state;
}

const mapDispatchToProps = { placePeg, incrementTurn, checkRow, endGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Row);