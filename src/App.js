import React, { Component } from 'react';
import './App.css';
import EditItemForm from './components/EditItemForm'
import api from './api/init'
import Item from './components/Item'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      list: [],
      newItem: "",
      editing: null
    }
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  updateNewItem = (event) => {
    this.setState({
      newItem: event.target.value
    })
  }

  addItem = (event) => {
    event.preventDefault()
    api
      .post('items/{listId}', {description: this.state.newItem, completed: false })
      .then((response) => {
        const lists = [...this.state.list, response.data]
        this.setState({ lists, newItem: ''})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteItem = (id) => {
    api
      .delete(`/items/{listId}/${id}`)
    const index = this.state.list.findIndex(item => item.id === id)
    console.log(index)
    if (index >= 0) {
      const list = [...this.state.list]
      list.splice(index, 1)
      this.setState({ list })
    }
  }

	editItem = (event, id) => {
		event.preventDefault()
		const form = event.target
		console.log(form)
		api
			.put(`/items/{listId}/${id}`, {
				id: form.elements.id.value,
				description: form.elements.description.value
			})
			.then(res => {
				this.fetchItems()
        this.setState({ editing: null})
			})
			.catch(error => {
				console.error("Error updating item: ", error)
			})
  }
  
  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  completedTask = (id) => {
    const list = [...this.state.list]
    const objId = list.findIndex((obj => obj.id === id))
    const updatedObj = { ...list[objId], completed: true}

    const updatedList = [
      ...list.slice(0, objId),
      updatedObj,
      ...list.slice(objId + 1)
    ]

    this.setState({
      list: updatedList
    })
  }

  render () {
    const list = this.state.list
    console.log(list)
    if (this.state.editing) {
      let item = this.state.editing
      console.log(`in app item: ${item.id}`)
      return (
        <EditItemForm key={item.id} item={item} edit={this.editItem} />
        // <div className="App">
        //   <h1>Edit</h1>

        //   <button onClick={this.toggleEdit}>Save</button>
        // </div>
      )
    }
    return (
      <div className="App">
        <h1>To Do Lists</h1>
        <br />
        <form onSubmit={this.addItem}>
          <label>Add job: </label><input onChange={this.updateNewItem} value={this.state.newItem}/>
          <input type="submit" value="Add job to list" />
        </form>
        <h3>Clean Room</h3>
        <ul>
          {this.state.list.map(item => 
            <Item key={item.id} {...item} deleteItem={this.deleteItem} />
            // <li key={item.id}>
            //   {item.description}
            //   <input type="checkbox" onChange={() => this.completedTask(item.id)}/>
            //   <button onClick={() => this.deleteItem(item.id)}>Delete</button>
            //   <button>Edit</button>
            // </li>
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
      this.setState({ list: list.data})
    } catch(err) {
      alert("Can't get items")
    }
  }
}

export default App;
