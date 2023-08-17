import axios from 'axios';

function getInfoFunction(endpoint, setState) {
  return (() => {
    axios.get(`http://34.64.36.211:5000${endpoint}`)
      .then(response => {
        setState(response.data[Object.keys(response.data)]);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  })
}

export default getInfoFunction;