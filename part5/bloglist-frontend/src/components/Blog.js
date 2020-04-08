import React, { useState } from 'react'
const Blog = ({ blog, handleUpdate, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 10
  }

  const showDetails = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handLikes = (value) => {
    const upateBlog = {
      user: value.user._id,
      likes: value.likes + 1,
      author: value.author,
      title: value.title,
      url: value.url
    }

    handleUpdate(value.id, upateBlog)
  }

  const handleDelete = value => {
    const destroy = window.confirm(`Remove ${value.title} by ${value.author}`)
    destroy && removeBlog(value.id)
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisible} style={{ cursor: 'pointer' }}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisible}>
          {visible ? 'hide' : 'view' }
        </button>
      </div>
      <div style={showDetails}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handLikes(blog)}>like</button>
        </div>
        <div>
          {blog.user && blog.user.name}
        </div>
        <div>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}


export default Blog
