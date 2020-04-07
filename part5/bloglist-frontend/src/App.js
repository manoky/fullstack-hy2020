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
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await blogService.login({
        username, password
      })
      
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
        
            <AddblogForm />
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