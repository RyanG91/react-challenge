import React, { Component } from 'react';
import './App.css';
import EditItemForm from './components/EditItemForm'
import api from './api/init'
import Item from './components/Item'
import store from './config/store'
import {
  setEditingAction
} from './config/actions'

class App extends Component {

  updateNewItem = (event) => {
    store.dispatch({
      type: 'set_updateNewItem',
      newItem: event.target.value
    })
  }

  addItem = (event) => {
    event.preventDefault()
    api
      .post('items/{listId}', {
        description: store.getState().newItem, 
        // completed: false
      })
      .then((response) => {
        const list = [...store.getState().list, response.data]
        store.dispatch({
          type: 'set_list',
          list, 
          newItem: ''})
        this.fetchItems()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteItem = (id) => {
    api
      .delete(`/items/{listId}/${id}`)
    const index = store.getState().list.findIndex(item => item.id === id)
    console.log(index)
    if (index >= 0) {
      const list = [...store.getState().list]
      list.splice(index, 1)
      store.dispatch({ 
        type: 'set_list',
        list 
      })
    }
  }

	editItem = (event) => {
		event.preventDefault()
		const form = event.target
		console.log(form)
		api
			.put(`/items/{listId}/${form.elements.id.value}`, {
				id: form.elements.id.value,
				description: form.elements.description.value
			})
			.then(res => {
				this.fetchItems()
        store.dispatch(setEditingAction(null))
			})
			.catch(error => {
				console.error("Error updating item: ", error)
			})
  }

  completedTask = (id) => {
    const list = [...store.getState().list]
    const objId = list.findIndex((obj => obj.id === id))
    const updatedObj = { ...list[objId], completed: true}

    const updatedList = [
      ...list.slice(0, objId),
      updatedObj,
      ...list.slice(objId + 1)
    ]

    store.dispatch({
      list: updatedList
    })
  }

  render () {
    const list = store.getState().list
    console.log(list)
    if (store.getState().editing) {
      let item = store.getState().editing
      console.log(`in app item: ${item.id}`)
      return (
        <EditItemForm key={item.id} item={item} edit={this.editItem} />
      )
    }
    return (
      <div className="App">
        <h1>To Do Lists</h1>
        <br />
        <form onSubmit={this.addItem}>
          <label>Add job: </label><input onChange={this.updateNewItem} value={store.getState().newItem}/>
          <input type="submit" value="Add job to list" />
        </form>
        <h3>Clean Room</h3>
        <ul>
          {store.getState().list.map(item => 
            <Item key={item.id} {...item} deleteItem={this.deleteItem} />
          )}
        </ul>
      </div>
    )
  }
  
  componentDidMount() {
    this.fetchItems()
  }

  async fetchItems() {
    try {
      const list = await api.get('items/{listId}')
      store.dispatch({
        type: 'set_list',
        list: list.data
      })
    } catch(err) {
      alert("Can't get items")
    }
  }
}

export default App;
