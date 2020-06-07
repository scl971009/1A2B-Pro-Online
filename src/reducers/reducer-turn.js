let turn = 0;

export default (state=null, action) => {
  switch (action.type) {
    case 'INCREMENT_TURN':
      return action.result + 1;
    case 'NEW_GAME':
      return turn;
    default:
      return state || turn;
  }
}