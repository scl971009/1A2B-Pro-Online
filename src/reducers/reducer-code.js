import { BOARD_WIDTH, COLOURS } from '../config';

const generateCode = () => [...new Array(BOARD_WIDTH)].map((_, i) => COLOURS[Math.floor(Math.random() * COLOURS.length)]);
const code = generateCode();

export default (state=null, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return generateCode();
    default:
      return state || code;
  }
}