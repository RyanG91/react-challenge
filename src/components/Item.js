import React from 'react'

function Item (props) {
  const { id, description, completed, deleteItem } = props

  return (
    <div>
      <p>{ description }</p>
      <button onClick={() => deleteItem(id)}>Delete</button>
    </div>
  )
}

export default Item