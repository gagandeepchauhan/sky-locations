import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001',
    params: {
        url: 'https://nominatim.openstreetmap.org'
    },
    headers: {
        'Content-Type': 'application/json'
    }
});