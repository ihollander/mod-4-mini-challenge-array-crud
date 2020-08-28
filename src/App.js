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

    // Add the new Todo to the list in state without mutating the original array
    const newTodos = [...this.state.todos, newTodo]

    this.setState({
      todos: newTodos,
      newTodoDescription: ""
    })
  }

  deleteTodo = id => {
    // Remove ONE todo from state using the id without mutating the existing array
    const copyTodos = [...this.state.todos];

    const copyTodosWithoutItem = copyTodos.filter( todo => todo.id !== id ) // only keep the todo items that do not have the id passed in

    this.setState({ todos: copyTodosWithoutItem })
  }

  updateTodo = (id, completed) => {
    // Update ONE todo in state using the id with mutating the existing array! Also, make sure not to mutate any objects within the array!
    const copyTodos = [...this.state.todos];

    const copyTodosWithItemUpdated = copyTodos.map( todo => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo
    })

    this.setState({ todos: copyTodosWithItemUpdated })
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
