import React from 'react'

const PersonForm = (props) => {
  const {
    handleSetName,
    handleSubmit,
    newName,
    newNumber,
    handleSetNumber
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleSetName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleSetNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm