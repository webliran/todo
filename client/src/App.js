import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import Form from './components/Form';
import './App.css';

function App() {

  let [todos, setTodos] = useState([]);
  let getTodos = async () => {
    let res = await fetch('http://localhost:5000/todo');
    let todos = await res.json();
    setTodos(todos);
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="App">
      <Form  getTodos={getTodos} />
      {
        todos.map((elem, key) => {
          return (
            <TodoItem key={key} info={elem} id={key} getTodos={getTodos} />
          )
        })
      }
    </div>
  );
}

export default App;
