import axios from 'axios';
import * as requestStorage from './request-storage.service';

const request = (url, config) => {

  const time = (new Date()).getTime();
  requestStorage.set(time, url, config);

  return axios(url, config)
    .then(response => response.data)
    .catch(error => {
      if (error && error.response && error.response.data && error.response.data.errors) {
        console.error(error.response.data.errors);
      }
      else {
        console.error(error);
      }
      return Promise.reject(error);
    });
}

export { request };