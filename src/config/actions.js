export function setListAction(list) {
  return {
    type: "set_list",
    list
  }
}

export function setUpdateNewItem(newItem) {
  return {
    type: 'set_updateNewItem',
    newItem
  }
}

export function setEditingAction(editing) {
  return {
    type: "set_editing",
    editing
  }
}