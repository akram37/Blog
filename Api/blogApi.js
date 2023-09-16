const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000/blogs',
    headers: {
        'Content-Type': 'application/json',
    }
});

exports.addBlog = blog => api.post('/',blog)

exports.getAllBlogs = () => api.get('/')

exports.getBlog = id => api.get(`/${id}`);

exports.editBlog = (id,blog) => api.patch(`/${id}`,blog)

exports.deleteBlog = id => api.delete(`/${id}`)
