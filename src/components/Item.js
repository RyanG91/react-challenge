import React from 'react'
import store from '../config/store'
import { setEditingAction } from '../config/actions'

function Item (props) {
  const { id, description, completed, deleteItem } = props

  return (
    <div>
      <p>{ description }</p>
      <button onClick={() => deleteItem(id)}>Delete</button>
      <button onClick={() => store.dispatch(setEditingAction(props)) }>Edit</button>
    </div>
  )
}

export default Item