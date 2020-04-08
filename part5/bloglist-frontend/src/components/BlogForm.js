import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    addBlog(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  const setBlogProperties = name => ({ target }) => {
    setBlog({ ...blog, [name]: target.value })
  }

  const {
    title,
    author,
    url
  } = blog

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: {' '}
          <input
            type="text"
            value={title}
            onChange={setBlogProperties('title')}
            id='title'
          />
        </div>
        <div>
          author: {' '}
          <input
            type="text"
            value={author}
            onChange={setBlogProperties('author')}
            id='author'
          />
        </div>
        <div>
          url: {' '}
          <input
            type="text"
            value={url}
            onChange={setBlogProperties('url')}
            id='url'
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm