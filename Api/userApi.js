const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000/users',
    headers: {
        'Content-Type': 'application/json',
    }
});

exports.addUser = (user) => api.post('/',user)

exports.getUsers = () => api.get('/')

