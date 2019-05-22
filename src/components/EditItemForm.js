import React from 'react'

export default function EditItemForm({ item, editItem, completedTask }) {
  console.log(`item: ${item}, editItem: ${editItem}`)
  return (
    <form onSubmit={editItem}>
      <label>
        Description: <input type="text" name="description" defaultValue={item.description} />
      </label>
      <label>
      Completed <input type="checkbox" name="completed" defaultValue={item.completed} onClick={() => completedTask(item.id)} />
      </label>
      <br />
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="order" value={item.order} />
      <button type="submit">Update</button>
    </form>
  )
}