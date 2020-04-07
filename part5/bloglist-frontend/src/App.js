import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddblogForm from './components/AddblogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/notification/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [noticeType, setNoticeType] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await blogService.login({
        username, password
      })
  
      blogService.setToken(user.token)
    
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      setUser(user)
      setNoticeType('success')
      setMessage(`${user.name} successfully logged in`)
    
    } catch (exception) {
      setNoticeType('error')
      setMessage(exception.response.data.error)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentUser')
    setNoticeType('error')
    setMessage(`${user.name} logged out`)
  }

  const addBlog = async(e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setNoticeType('success')
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)

      setBlogs([...blogs, newBlog])
    } catch(exception) {

      setNoticeType('error')
      setMessage(exception.response.data.error)
    }
    setBlog({ title: '', author: '', url: '' })
  }

  const setBlogProperties = name => ({ target }) => {
    setBlog({ ...blog, [name]: target.value })
  }

  const loginForm = () => (
    <Togglable buttonLable='login'>
      <LoginForm
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLable='create note'>
      <AddblogForm
        title={blog.title}
        author={blog.author}
        url={blog.url}
        setBlog={setBlogProperties}
        addBlog={addBlog}
      />
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App