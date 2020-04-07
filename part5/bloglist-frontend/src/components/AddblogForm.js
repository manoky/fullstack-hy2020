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
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={setBlog}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={setBlog}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={setBlog}
        />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  )
}

export default AddblogForm