const gameEnded = false;

export default (state=null, action) => {
  switch (action.type) {
    case 'END_GAME':
      return true;
    case 'NEW_GAME':
      return false;
    default:
      return state || gameEnded;
  }
}