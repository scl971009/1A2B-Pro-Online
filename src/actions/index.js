import { BOARD_WIDTH } from '../config';
import store from '../store';

export const placePeg = (colour) => {
  const { boardState, turn } = store.getState();
  const newBoard = [...boardState];
  const currentRow = [...newBoard[turn]];
  const nextPegHole = currentRow.findIndex(element => !element);
  if (nextPegHole===-1) return { type: 'DONT_PLACE_PEG' }; // row full

  currentRow[nextPegHole] = colour;
  newBoard[turn] = currentRow;

  return {
    type: 'PLACE_PEG',
    result: newBoard,
  };
};

export const incrementTurn = () => {
  const { turn } = store.getState();
  return {
    type: 'INCREMENT_TURN',
    result: turn,
  };
};

export const checkRow = (originalGuess) => {
  const { turn, code } = store.getState();
  let resultIndex = 0;
  let guess = [...originalGuess];
  let codeToCheck = [...code];
  const result = [];

  // check exact matches
  for (let i=0; i<BOARD_WIDTH; i+=1) {
    if (guess[i]===code[i]) {
      guess.splice(i,1, undefined);
      codeToCheck.splice(i,1, undefined);
      result[resultIndex] = 'red';
      resultIndex+=1;
    }
  }
  guess = guess.filter(n => n !== undefined);
  codeToCheck = codeToCheck.filter(n => n !== undefined);

  // check partial matches
  for (let i=0; i<guess.length; i+=1) {
    let indexInCode = codeToCheck.indexOf(guess[i]);
    if (indexInCode!==-1) {
      codeToCheck.splice(indexInCode,1);
      result[resultIndex] = 'white';
      resultIndex+=1;
    }
  }
  return {
    type: 'CHECK_ROW',
    result: {
      result,
      turn,
    },
  };
};

export const clearRow = (turn) => {
  return {
    type: 'CLEAR_ROW',
    result: {
      turn,
    }
  };
}

export const newGame = () => {
  return {
    type: 'NEW_GAME',
  };
}

export const endGame = () => {
  return {
    type: 'END_GAME',
  };
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
  }
}