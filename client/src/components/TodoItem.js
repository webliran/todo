import React from 'react';
import './Todo.css';

function TodoItem(props) {
    let {todo,complete} = props.info;
    let id = props.id;

    let updateComplete = async (id) => {
        let res = await fetch(`http://localhost:5000/todo/update-status/${id}`,{
            method: 'POST'
        });
        let isDone = await res.json();
        props.getTodos();
    }
    
    return (
        <div className="TodoItem">
            <div>{todo}</div>
            <div><input type="checkbox" checked={complete} onChange={() => updateComplete(id)} /></div>
        </div>
    );
}

export default TodoItem;
