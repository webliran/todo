import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import Form from './components/Form';
import './App.css';

function App() {

  let [todos, setTodos] = useState([]);
  let [token, setToken] = useState('');

  
  useEffect(() => {
    login();
  }, [])
  
  useEffect(() => {
    getTodos();
  }, [token])


  let login = async () =>{
    const params = new URLSearchParams();
    params.set("name","liran")
    params.set("password","123456")

    let res = await fetch(`http://localhost:5000/login/`, {
        method: 'POST',
        body: params
    });
    let key = await res.json();
    if(!key.error){
      setToken(key.accessToken)
    }
    
  }

  let getTodos = async () => {
      if(token){
        let res = await fetch('http://localhost:5000/todo',{
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        let todos = await res.json();
        setTodos(todos);    
      }
      
  }

  return (
    <div className="App">
      <Form  getTodos={getTodos}  token={token}/>
      {
        todos.map((elem, key) => {
          return (
            <TodoItem key={key} info={elem} id={key} getTodos={getTodos} token={token} />
          )
        })
      }
    </div>
  );
}

export default App;
