import axios from 'axios';

// const proxy = "https://whaledetectorapi.kro.kr";
const proxy = "http://34.22.69.145:5000";

function get(endpoint, todo=(response)=>{}, todoOnError=(error)=>{}) {
  axios.get(proxy + endpoint)
    .then(response => {
      todo(response);
    })
    .catch(error => {
      console.error('API 요청 에러:', error);
      todoOnError(error);
    });
}

function getInfoFunction(endpoint, setState, todo=()=>{}, todoOnError=()=>{}) {
  return (() => {
    axios.get(proxy + endpoint)
      .then(response => {
        setState(response.data);
        todo();
      })
      .catch(error => {
        console.error('API 요청 에러:', error);
        todoOnError();
      });
  })
}

function postFunction(endpoint, params, todo=()=>{}, todoOnError=()=>{}) {
  return (() => {
    axios.post(proxy + endpoint, params)
      .then(response => {
        todo();
      })
      .catch(error => {
        console.error('POST 요청 에러:', error);
        todoOnError();
      });
  })
}

function post(endpoint, params, todo=(response)=>{}, todoOnError=(error)=>{}) {
  axios.post(proxy + endpoint, params)
    .then(response => {
      todo(response);
    })
    .catch(error => {
      console.error('POST 요청 에러: ', error);
      todoOnError(error);
    });
}

export { getInfoFunction, postFunction, post, get };