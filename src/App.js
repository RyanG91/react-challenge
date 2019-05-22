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

// Reverse the tasks within the list state
  reverse = () => {
    store.dispatch({
      type: 'set_list',
      list: store.getState().list.reverse()
    })
  }

  updateNewItem = (event) => {
    store.dispatch({
      type: 'set_updateNewItem',
      newItem: event.target.value
    })
  }

  addItem = (event) => {
    event.preventDefault()
    let orderNumber = store.getState().order + 1
    api
      .post('items/{listId}', {
        description: store.getState().newItem, 
        order: orderNumber,
        completed: false
      })
      .then((response) => {
        const list = [...store.getState().list, response.data]
        store.dispatch({
          type: 'set_addItem',
          list, 
          newItem: '',
          order: orderNumber
        })
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
        description: form.elements.description.value,
        completed: form.elements.completed.value,
        order: form.elements.order.value
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
      type: 'set_list',
      list: updatedList
    })
  }

  render () {
    const list = store.getState().list
    console.log(list)
    if (store.getState().editing) {
      let item = store.getState().editing
      console.log(`in app item: ${item.id} and ${item.completed}`)
      return (
        <EditItemForm key={item.id} item={item} editItem={this.editItem} completedTask={this.completedTask} />
      )
    }
    return (
      <div className="App">
        <h1>To Do Lists</h1>
        <br />
        <form onSubmit={this.addItem}>
          <label>Add task: </label><input onChange={this.updateNewItem} value={store.getState().newItem}/>
          <input type="submit" value="Add task to list" />
        </form>
        <h3>Clean Room</h3>
        <button onClick={this.reverse}>Reverse</button>
        <ul>
          {store.getState().list.map(item => 
            <Item key={item.id} {...item} deleteItem={this.deleteItem} completedTask={this.completedTask} />
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
