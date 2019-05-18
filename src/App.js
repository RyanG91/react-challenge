import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [],
    newItem: ""
  }

  updateNewItem = (event) => {
    this.setState({
      newItem: event.target.value
    })
  }

  addItem = (event) => {
    event.preventDefault()
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
      completed: false
    }
    let list = [...this.state.list]
    list.push(newItem)
    this.setState({
      list: list, newItem: ""
    })
  }

  deleteItem = (id) => {
    const list = [...this.state.list]
    const updatedList = list.filter(item => item.id !== id)
    this.setState({
      list: updatedList
    })
  }

  completedTask = (id) => {
    const list = [...this.state.list]
  }

  render () {
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
            <li key={item.id}>
              {item.value}
              <input type="checkbox" onChange={this.completedTask}/>
              <button>Edit</button>
              <button onClick={() => this.deleteItem(item.id)}>
                Delete
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default App;
