import Combinatorics from 'js-combinatorics';
import _ from 'lodash';

import { COLOURS, BOARD_WIDTH } from '../config';
import store from '../store';
import { placePeg, checkRow, endGame, incrementTurn } from '../actions';

let possibilities = [], outcomes = [], firstPass=true;
const startPlaySelf = () => {
  possibilities = Combinatorics.baseN(COLOURS, BOARD_WIDTH).toArray();
  outcomes = Combinatorics.baseN(['red', 'white', undefined], BOARD_WIDTH).toArray();
  outcomes.forEach(el=>el.sort());
  outcomes = _.uniq(outcomes, a => JSON.stringify(a));

  firstPass = true;

  playSelf([COLOURS[0], COLOURS[0], COLOURS[1], COLOURS[1]]);
}

const playSelf = (sequenceToGuess) => {
  doGuess(sequenceToGuess);
  const { gameEnded, boardState, turn, results } = store.getState();

  // check if game won
  if (gameEnded) return;

  // trim posibilites that cannot exist
  for (let i=0; i<possibilities.length; i+=1) {
    const checkedResults = checkGuessToAnswer(possibilities[i], boardState[turn - 1]);
    const actualResults = _.clone(results[turn - 1]);
    if (!_.isEqual(checkedResults, actualResults)) {
      possibilities.splice(i, 1);
      i-=1;
    }
  }
  console.log(`evaluating ${possibilities.length} possibilities`);

  // make a second guess on the first pass to eliminate possibilities and speed up the process
  // this can result in one extra guess but saves up to 1min 10sec.
  if (firstPass) {
    firstPass = false;
    playSelf([COLOURS[2], COLOURS[2], COLOURS[3], COLOURS[3]]);
    return;
  }

  // find the solution that will provide the most info
  let min = Number.MAX_VALUE;
  let minCombination = null;
  for (let guess in possibilities) {
    var max = 0;
    for (let outcome in outcomes) {
      var count = 0;
      for (let solution in possibilities) {
        if(_.isEqual(checkGuessToAnswer(possibilities[guess], possibilities[solution]), outcomes[outcome]))
          count+=1;
      }
      if(count > max)
        max = count;
    }
    if(max < min){
      min = max;
      minCombination = possibilities[guess];
    }
  }

  // create the illusion of thinking
  setTimeout(() => {
    playSelf(minCombination);
  }, 300);
}

const doGuess = (sequenceToGuess) => {
  for (let i=0; i<BOARD_WIDTH; i+=1) {
    store.dispatch(placePeg(sequenceToGuess[i]));
  }
  const { result } = store.dispatch(checkRow(sequenceToGuess));
  const r = result.result;
  if(
    r.length===BOARD_WIDTH &&
    'red' === r.reduce((previous, current) => (previous===current) ? previous : NaN)
  ) {
    store.dispatch(endGame());
  } else {
    store.dispatch(incrementTurn());
  }
}

const checkGuessToAnswer = (guessInput, answerInput) => {
  let guess = _.clone(guessInput);
  let answer = _.clone(answerInput);
  let resultIndex = 0;
  let testResults = [];

  //check exact matches
  for (let i=0; i<BOARD_WIDTH; i+=1) {
    if (guess[i]===answer[i]) {
      guess.splice(i, 1, undefined);
      answer.splice(i, 1, undefined);
      testResults[resultIndex] = 'red';
      resultIndex+=1;
    }
  }
  guess = guess.filter(n => n !== undefined);
  answer = answer.filter(n => n !== undefined);

  //check partial matches
  for (let j=0; j<guess.length; j+=1){
    let indexInCode = answer.indexOf(guess[j]);
    if (indexInCode!==-1){
      answer.splice(indexInCode,1);
      testResults[resultIndex] = 'white';
      resultIndex+=1;
    }
  }
  return testResults;
}

export { startPlaySelf, playSelf, checkGuessToAnswer };