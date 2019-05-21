import React from 'react'

export default function EditItemForm({ item, edit }) {
  console.log(`item: ${item}, editItem: ${edit}`)
  return (
    <form onSubmit={edit}>
      <label>
        Description: <input type="text" name="description" defaultValue={item.description} />
      </label>
      <br />
      <input type="hidden" name="id" value={item.id} />
      <button type="submit">Update</button>
    </form>
  )
}