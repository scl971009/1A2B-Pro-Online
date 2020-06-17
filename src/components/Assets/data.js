/*
const devAPI = 'http://localhost:3000';
const prodAPI = 'https://chess-game-api.herokuapp.com';
const baseAPI = process.env.REACT_APP_ENV === 'development' ? devAPI : prodAPI;
*/
const baseAPI = 'https://127.0.0.1:6000';

const data = {
  api: `${baseAPI}/api`,
  // api: prodAPI,
  baseAPI,
};

export default data;