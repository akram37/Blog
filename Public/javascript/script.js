import { destroyBlog } from '../../Controllers/blog.js';
document.addEventListener('click',(e)=>{
    const target=e.target
    const blogId=target.id
    console.log(blogId)
    const targetGrandParent=target.parentElement.parentElement
    if(target.classList.contains("deleteIcon")){
      targetGrandParent.remove()
      destroyBlog(blogId)
      length--
      if(length==0) location.reload();
    }
})