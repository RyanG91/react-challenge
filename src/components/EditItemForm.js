import React from 'react'

export default function EditItemForm({ item, editItem }) {
  console.log(`item: ${item}, editItem: ${editItem}`)
  return (
    <form onSubmit={editItem}>
      <label>
        Description: <input type="text" name="description" defaultValue={item.description} />
      </label>
      <br />
      <label>
        id: <input type="hidden" name="id" value={item.id} />
      </label>
      <button type="submit">Update</button>
    </form>
  )
}