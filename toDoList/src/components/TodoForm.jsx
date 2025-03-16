import {useState} from 'react'

const TodoForm = ({addTodo}) => {//na data está seguindo o padrão brasileiro, tem q mudar depois
    const [description, setDescription]=useState("")
    const [end_date, setEnd_date] = useState("")

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(!description||!end_date) return
        addTodo(description, end_date)
        setDescription("")
        setEnd_date("")
        console.log(description, end_date)
    }
    return <div className="todo-form">
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
            <input type="description" plac1eholder="What's your task?" value={description} onChange={(event)=> setDescription(event.target.description)}/>
            <input type="date" value={end_date} onChange={(event)=> setEnd_date(event.target.end_date)}/>
            <button type="submit">Create Task</button>
        </form>
    </div>
}

export default TodoForm