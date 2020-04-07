import React from 'react'

const AddblogForm = (props) => {
  const {
    title,
    author,
    addBlog,
    setBlog,
    url
  } = props

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: {' '}
          <input
            type="text"
            value={title}
            onChange={setBlog('title')}
          />
        </div>
        <div>
          author: {' '}
          <input
            type="text"
            value={author}
            onChange={setBlog('author')}
          />
        </div>
        <div>
          url: {' '}
          <input
            type="text"
            value={url}
            onChange={setBlog('url')}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default AddblogForm