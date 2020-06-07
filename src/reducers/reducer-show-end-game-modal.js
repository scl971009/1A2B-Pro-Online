const showEndGameModal = false;

export default (state=null, action) => {
  switch (action.type) {
    case 'END_GAME':
      return true;
    case 'NEW_GAME':
      return false;
    case 'CLOSE_MODAL':
      return false;
    default:
      return state || showEndGameModal;
  }
}