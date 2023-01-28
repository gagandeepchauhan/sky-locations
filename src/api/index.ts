import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_PROXY_SERVER_URL,
    params: {
        url: process.env.REACT_APP_OSM_API_URL
    },
    headers: {
        'Content-Type': 'application/json'
    }
});