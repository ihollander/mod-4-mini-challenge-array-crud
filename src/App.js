import React from 'react';

const myTodos = [
  { id: 1, description: "Create a new todo", completed: false },
  { id: 2, description: "Update an existing todo", completed: false },
  { id: 3, description: "Delete an existing todo", completed: false }
]

// this is a bad way to make IDs. Demo purposes only!
const getNextId = (id => () => ++id)(3)

class App extends React.Component {
  state = {
    todos: myTodos,
    newTodoDescription: ""
  }

  createTodo = e => {
    e.preventDefault()
    const newTodo = {
      id: getNextId(), // use our id generator fn to assign a new ID since we don't have a database
      description: this.state.newTodoDescription,
      completed: false
    }

    let newTodosList = [...this.state.todos, newTodo]

    this.setState({
      todos: newTodosList,
      newTodoDescription: ""
    })
  }

  deleteTodo = id => {
    // console.log("deleteTodo", id)

    let shortList = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos: shortList
    })
  }

  updateTodo = (id, completed) => {
    // console.log("updateTodo", id, completed)

    let updatedList = this.state.todos.map(todo => {
      if (todo.id === id) {
        let updatedObj = {...todo}
        updatedObj.completed = completed
        return updatedObj
      }
      return todo
    })

    this.setState({
      todos: updatedList
    })
  }

  render() {
    return (
      <div className="App">
        <h2>Add Todos</h2>
        <form onSubmit={this.createTodo}>
          <label>
            Description:
            <input type="text" value={this.state.newTodoDescription} onChange={e => this.setState({ newTodoDescription: e.target.value })} />
          </label>
          <input type="submit" value="Add todo" />
        </form>
        <h2>My Todos</h2>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <strong>
                {todo.description}
              </strong>
              <label>
                Completed? <input type="checkbox" onChange={e => this.updateTodo(todo.id, e.target.checked)} checked={todo.completed} />
              </label>
              <button onClick={() => this.deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
