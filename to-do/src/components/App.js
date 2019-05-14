import React from 'react';
import ToDoItem from './ToDoItem';
import data from '../data';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: data
    };
    this.handleCheck=this.handleCheck.bind(this);
  }
  handleCheck(id) {
    this.setState( prevState => {
      console.log("Id:", id);
      const updatedTodos = prevState.todos.map( item => {
        if(item.id === id) {
          item.completed=!item.completed
        }
        return item;
      })
      console.log(updatedTodos);
      return {
        todos: updatedTodos
      }
    });
  }
  render() {
    const todoItems = this.state.todos.map( item => 
      <ToDoItem
        key={item.key}
        item={item}
        handleCheck={this.handleCheck}
      />
    );
    return (
      <div className="App">
        {todoItems}
      </div>
    );
  }
}

export default App;