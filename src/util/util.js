import axios from 'axios';

// const proxy = "https://whaledetectorapi.kro.kr";
const proxy = "http://34.64.230.101";

export function get(endpoint, params={}) {
  return axios.get(proxy + endpoint, params);
}

export function post(endpoint, params={}) {
  return axios.post(proxy + endpoint, params);
}

export function patch(endpoint, params={}) {
  return axios.patch(proxy + endpoint, params);
}