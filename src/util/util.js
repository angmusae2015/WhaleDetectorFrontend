import axios from 'axios';

function getInfoFunction(endpoint, setState) {
  return (() => {
    // axios.get(`https://whaledetectorapi.kro.kr${endpoint}`)
    axios.get(`http://34.22.69.145:5000${endpoint}`)
      .then(response => {
        setState(response.data);
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
      });
  })
}

export default getInfoFunction;