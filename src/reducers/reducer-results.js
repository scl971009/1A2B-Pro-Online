import { BOARD_HEIGHT, BOARD_WIDTH } from '../config';

const results = [...Array(BOARD_HEIGHT).keys()].map(i => Array(BOARD_WIDTH));

export default (state=null, action) => {
  switch (action.type) {
    case 'CHECK_ROW':
      const {
        turn,
        result
      } = action.result;
      const newState = [...state];
      newState[turn] = result;
      return newState;
    case 'NEW_GAME':
      return results;
    default:
      return state || results;
  }
}