import {createStore} from 'redux'

const initialState = {
  list: [],
  newItem: "",
  editing: null,
  order: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case "set_list":
      return {...state, list: action.list}
    case "set_updateNewItem":
      return {...state, newItem: action.newItem}
    case "set_editing":
      return {...state, editing: action.editing}
    case "set_addItem":
      return {...state, list: action.list, order: action.order}
    
    default:
      console.log(`Redux reducer: Action ${action.type} does not exist`)
      return state
  }
}

export default createStore(reducer, initialState)