const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000/users',
    headers: {
        'Content-Type': 'application/json',
    }
});

exports.addUser = async (user) => {
    try {
      const response = await api.post('/', user);
      const newUser = response.data; 
      return newUser.id
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

exports.getUsers = () => api.get('/')

