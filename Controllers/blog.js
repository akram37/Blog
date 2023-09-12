const {getUserBlogs,getAllBlogs, addBlog } = require('../Api/blogApi');

exports.fetchBlogs = async () => {
    const api = await getAllBlogs()
    const blogs = await api.data
    return blogs
}

exports.fetchBlog = async id => {
    const api = await getAllBlogs()
    const blogs = await api.data
    const userBlogs = blogs.filter(b => b.authorId==id)
    return userBlogs
}

exports.createBlog = async id => {
      const {title,description,text} = req.body;
      const imagePath = req.file ? `${req.file.filename}` : 'default-image.jpg';
      const newBlog = {
        title: title,
        description: description,
        text:text,
        blogImage:imagePath,
        authorId:userId,
      };
      addBlog(newBlog);
      res.redirect(`/:${userId}`);
    }