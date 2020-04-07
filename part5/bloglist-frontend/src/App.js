import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddblogForm from './components/AddblogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
        console.log(exception)
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
    
    } catch (error) {
      console.log(error)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('currentUser')
  }

  const addBlog = async(e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      console.log(newBlog)
      setBlogs([...blogs, newBlog])
    } catch(exception) {
      console.log(exception.response.data)
    }
    setBlog({ title: '', author: '', url: '' })
  }

  const setBlogProperties = name => ({ target }) => {
    setBlog({ ...blog, [name]: target.value })
  }
  console.log(blog)
  return (
    <div>
      {
        !user ? (
          <LoginForm
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            handleLogin={handleLogin}
          />
        ) : (
          <>
            <h2>blogs</h2>
            <p>
              {user.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
        
            <AddblogForm
              title={blog.title}
              author={blog.author}
              url={blog.url}
              setBlog={setBlogProperties}
              addBlog={addBlog}
            />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        )
      }
    </div>
  )
}

export default App