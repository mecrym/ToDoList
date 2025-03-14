import React from 'react'

const TodoForm = () => {//na data está seguindo o padrão brasileiro, tem q mudar depois
    return <div className="todo-form">
        <h2>New Task</h2>
        <form action="">
            <input type="date"/>
            <input type="text" plac1eholder="What's your task?"/>
            <button type="submit">Create Task</button>
        </form>
    </div>
}

export default TodoForm