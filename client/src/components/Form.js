import React, { useState } from 'react';

function Form(props) {

    let [todoText, setTodoText] = useState('');

    let addTodo = async () => {
        const params = new URLSearchParams();
        params.set("todo", todoText)

        let res = await fetch(`http://localhost:5000/todo/`, {
            method: 'POST',
            body: params,
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        });
        let isDone = await res.json();
        setTodoText("");
        props.getTodos();
    }

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); }}>
                <input type="text" value={todoText} onChange={e => setTodoText(e.target.value)} />
                <button type="button" onClick={() => addTodo()}>הוסף משימה</button>
            </form>
        </div>
    )
}

export default Form;