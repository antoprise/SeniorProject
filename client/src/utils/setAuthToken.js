import axios from 'axios';
// import Cookies from "js-cookie"
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log(axios.defaults.headers.common)
  } 
  else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    console.log(axios.defaults.headers.common)
  }
};

export default setAuthToken;
