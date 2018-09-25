import axios from 'axios';

const request = (url, config) => {
    return axios(this.state.url, config)
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