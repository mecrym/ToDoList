import { useState } from "react"
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	//aq está definindp os valores iniciais e onde as tarefas serão armazenadas
	const [todos, setTodos] = useState([
		{
			id: 1,
			description: "finalizar projeto Robbson's",
			end_date: "2025-03-17",
			completed: false,
			archived: false,
		},
		{
			id: 2,
			description: "prova",
			end_date: "2025-03-20",
			completed: false,
			archived: false,
		},
		{
			id: 3,
			description: "campeonato de Regex",
			end_date: "2025-03-26",
			completed: false,
			archived: false,
		}
	])

const [search, setSearch]=useState("")
	const addTodo = (description, end_date) => {
		const newTodos = [...todos, {
			id: Math.floor(Math.random()*1000),
			description,
			end_date,
			completed: false,
			archived: false,
		}]

		setTodos(newTodos)
	} 

	const removeTodo = (id) => {
		const newTodos = [...todos]
		const filteredTodos = newTodos.filter(
			(todo) => todo.id !== id ? todo: null
		)
		setTodos(filteredTodos)
	}

	/**criar função para mover cards para outra aba */
	const completeTodo = (id) => {
		const newTodos = [...todos]
		newTodos.map((todo) => todo.id == id ? todo.completed = !todo.completed : todo)
		setTodos(newTodos)
	}

	const archivedTodo = (id) => {
		const newTodos = [...todos]
		newTodos.map((todo) => todo.id == id ? todo.archived = !todo.archived : todo)
		setTodos(newTodos)
	}

    return (
		<div className="app">
			<h1>Your ToDo List!</h1>
			<Search search={search} setSearch={setSearch}/>
			<div className="todo-list">
				{todos.filter((todo)=>todo.description.toLowerCase().includes(search.toLowerCase()))
				.map((todo) => (//passar pro cadesno do caos, func array q percorre todos os itens do todo
					<Todo key={todo.id} todo = {todo} removeTodo={removeTodo} completeTodo={completeTodo} archivedTodo={archivedTodo}/>
				))}
			</div>
			<TodoForm addTodo={addTodo}/>
		</div>
	);
}

export default App
