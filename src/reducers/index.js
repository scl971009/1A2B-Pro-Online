import { combineReducers } from 'redux';
import BoardStateReducer from './reducer-board-state';
import TurnReducer from './reducer-turn';
import CodeReducer from './reducer-code';
import ResultsReducer from './reducer-results';
import EndGameReducer from './reducer-end-game';
import ShowEndGameModalReducer from './reducer-show-end-game-modal';
import userReducer from './reducer-user';

const rootReducer = combineReducers({
  userreducer: userReducer,
  boardState: BoardStateReducer,
  turn: TurnReducer,
  code: CodeReducer,
  results: ResultsReducer,
  gameEnded: EndGameReducer,
  showEndGameModal: ShowEndGameModalReducer,
});

export default rootReducer;
