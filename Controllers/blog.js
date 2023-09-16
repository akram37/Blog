const fs = require('fs');
const {getAllBlogs,getBlog,addBlog,editBlog,deleteBlog} = require('../Api/blogApi');

exports.fetchAllBlogs = async () => {
    const api = await getAllBlogs()
    const blogs = await api.data
    return blogs
}

exports.fetchUserBlogs = async id => {
    const api = await getAllBlogs()
    const blogs = await api.data
    const userBlogs = blogs.filter(b => b.authorId==id)
    return userBlogs
}

exports.fetchBlog = async id => {
    const api = await getBlog(id)
      const blog = await api.data
      return blog  
}


exports.createBlog = (req,res,next) => {
      const {title,description,text} = req.body;
      const imagePath = req.file ? `${req.file.filename}` : 'default-image.jpg';
      console.log(req.body);
      console.log(imagePath);
      console.log("user id from jwt  "+req.user.id);
      const userId=req.user.id

      const currentTimeMillis = Date.now();
      // Create a Date object from the timestamp
      const postingDate = new Date(currentTimeMillis);
      // Format the postingDate in a human-readable format (e.g., "September 13, 2023 15:45")
      const formattedPostingDate = postingDate.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });

      const newBlog = {
        title: title,
        description: description,
        text:text,
        blogImage:imagePath,
        postingDate:formattedPostingDate,
        authorId:userId
      };
      addBlog(newBlog)
      console.log(newBlog);
      res.redirect('/dashboard')
    }

    exports.destroyBlog = async id => {
      const api = await deleteBlog(id)
      if (api.status === 200) {
        console.log(`Blog with ID ${id} has been deleted.`);
    } else {
        console.error(`Failed to delete blog with ID ${id}.`);
    }
  }


  exports.editBlog = async (req, res, next) => {
    const blogId = req.params.id;
    try{
      const blog=await this.fetchBlog(blogId)
      if(blog){
        const {title,description,text} = req.body;
        const blogImage = req.file ? `${req.file.filename}` : blog.blogImage;
        if(blogImage!==blog.blogImage){
          const filePath = `../Public/uploads/blogs/${blog.blogImage}`;
          fs.unlinkSync(filePath)
        }
        const response = await editBlog(blogId,{
          title,description,text,blogImage
        });
        res.redirect('/dashboard')
      }
      else{
        throw new Error("not found")
      } 
    }
    catch(err){
      console.log(err.message)
    }
  };

