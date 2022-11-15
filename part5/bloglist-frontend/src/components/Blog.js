import Togglable from "./Togglable"
import blogsService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs, notification, setNotification }) => {

  const handleDelete = async () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      await blogsService.deleteBlog(blog.id)
      setBlogs( blogs.filter(b => b.id !== blog.id) )
      setNotification(`${blog.title} deleted🚮`)
      setNotification(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLikeCount = async () => {
    const likeUpdated = {
      title: blog.title,
      author: blog.author,
      likes: parseInt(blog.likes) + 1,
      url: blog.url,
      id: blog.id
    }
    await blogsService.updateLike(likeUpdated)
    setBlogs( blogs.map(b => b.id !== blog.id ? b : likeUpdated))
  }

  return (
    <div style={{
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }}>
      
      <i> { blog.title } </i>
      <b> { blog.author } </b>
      
      <Togglable buttonLabel='view'>
        <div> { blog.title } <button onClick={ handleDelete }>remove</button><br /> 
        { blog.url } <br />
        { blog.likes } <button onClick={ handleLikeCount }>like</button><br />
        { blog.author } </div>
      </Togglable>

    </div>
  )  
}

export default Blog