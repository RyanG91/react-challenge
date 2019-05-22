import React from 'react'
import store from '../config/store'
import { setEditingAction } from '../config/actions'

function Item (props) {
  const { id, description, completedTask, deleteItem, order } = props

  return (
    <div>
      <p>{order}) { description }</p>
      <label>
        Completed: <input type="checkbox" onChange={() => completedTask(id)} />
      </label>
      <button onClick={() => store.dispatch(setEditingAction(props)) }>Edit</button>
      <button onClick={() => deleteItem(id)}>Delete</button>
      <br />

    </div>
  )
}

export default Item