import { useState } from 'react'

const TodoForm = ({ addTodo }) => {
    const [description, setDescription] = useState("")
    const [end_date, setEnd_date] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!description || !end_date) return
        addTodo(description, end_date)
        setDescription("")
        setEnd_date("")
        console.log(description, end_date)
    }

    return <div className="todo-form">
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}> 
            <input type="text" placeholder="What's your task?" value={description} onChange={(event) => setDescription(event.target.value)} />
            <input type="date" value={end_date} onChange={(event) => setEnd_date(event.target.value)} />
            <button type="submit">Create Task</button>
            <button type="reset">Cancel</button>
        </form>
    </div>
}

export default TodoForm