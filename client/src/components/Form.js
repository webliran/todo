import React, { useState } from 'react';

function Form(props) {

    let [todoText, setTodoText] = useState('');

    let addTodo = async () => {
        const params = new URLSearchParams();
        params.set("todo",todoText)

        let res = await fetch(`http://localhost:5000/todo/`, {
            method: 'POST',
            body: params
        });
        let isDone = await res.json();
        props.getTodos();
    }

    return (
        <div>
            <form>
                <input type="text" value={todoText} onChange={e => setTodoText(e.target.value)} />
                <button type="button" onClick={() => addTodo()}>הוסף משימה</button>
            </form>
        </div>
    )
}

export default Form;