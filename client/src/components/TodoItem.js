import React from 'react';
import './Todo.css';

function TodoItem(props) {
    let {todo,complete} = props.info;
    let id = props.id;

    let updateComplete = async (id) => {
        let res = await fetch(`http://localhost:5000/todo/${id}`,{
            method: 'PUT'
        });
        let isDone = await res.json();
        props.getTodos();
    }
    
    let deleteTodo = async (id) => {
        let res = await fetch(`http://localhost:5000/todo/${id}`,{
            method: 'DELETE'
        });
        let isDeleted = await res.json();
        console.log(isDeleted)
        props.getTodos();
    }

    return (
        <div className="TodoItem">
            <div>{todo}</div>
            <div><input type="checkbox" checked={complete} onChange={() => updateComplete(id)} /><button className="btn btn-danger" onClick={() => deleteTodo(id)}>X</button></div>
        </div>
    );
}

export default TodoItem;
