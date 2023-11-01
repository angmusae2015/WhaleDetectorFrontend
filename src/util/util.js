import axios from 'axios';

const proxy = "https://whaledetectorapi.kro.kr";
// const proxy = "http://35.216.71.169:5000";

/* function get(endpoint, todo=(response)=>{}, todoOnError=(error)=>{}) {
  axios.get(proxy + endpoint)
    .then(response => {
      todo(response);
    })
    .catch(error => {
      console.error('API 요청 에러:', error);
      todoOnError(error);
    });
} */

export function get(endpoint, params={}) {
  return axios.get(proxy + endpoint, params);
}

export function post(endpoint, params={}) {
  return axios.post(proxy + endpoint, params);
}

export function patch(endpoint, params={}) {
  return axios.patch(proxy + endpoint, params);
}