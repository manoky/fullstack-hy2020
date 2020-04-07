import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/notification/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [noticeType, setNoticeType] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        setNoticeType('error')
        setMessage(exception.response.data.error)
      }
    })()

  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async (credentials) => {
  
    try {
      const user = await blogService.login(credentials)
  
      blogService.setToken(user.token)
    
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      setUser(user)
      setNoticeType('success')
      setMessage(`${user.name} successfully logged in`)
    
    } catch (exception) {
      setNoticeType('error')
      setMessage(exception.response.data.error)
    }
    
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentUser')
    setNoticeType('error')
    setMessage(`${user.name} logged out`)
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blog)
      setNoticeType('success')
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)

      setBlogs([...blogs, newBlog])
    } catch(exception) {

      setNoticeType('error')
      setMessage(exception.response.data.error)
    }
    
  }

  const handleUpdate = async (id, updateBlog) => {
    try {
      const updatedBlog = await blogService.update(id, updateBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
      
    } catch(exception) {
      setNoticeType('error')
      setMessage(exception.response.data.error)
    }
  }

  const loginForm = () => (
    <Togglable buttonLable='login'>
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLable='new note' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {message && (
        <Notification
          type={noticeType}
          setMessage={setMessage}
          message={message}
        />
      )}
      <h2>blogs</h2>
      {
        !user ? (
          loginForm()
        ) : (
          <>
            <p>
              {user.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
        
            {blogForm()}
          </>
        )
      }
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default App