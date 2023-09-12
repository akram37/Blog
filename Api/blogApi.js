const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3000/blogs',
    headers: {
        'Content-Type': 'application/json',
    }
});

exports.addBlog = (blog) => api.post('/',blog)

exports.getAllBlogs = () => api.get('/')

// const blog={
//     title: "blog 4",
//     description: "desc of blog 4",
//     text: "text of blog 4",
//     blogImage: "1694518666997-IMG-20210909-WA0004.jpg",
//     authorId: "2"
// }

// this.addBlog(blog)