import { useState } from "react"
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab, Tabs} from "react-bootstrap";

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
	const [currentTab, setCurrentTab] = useState("active")

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


	const completeTodo = (id) => {
		setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
		))
	}
	/**criar função para mover cards para outra aba */
	const archivedTodo = (id) => {
		setTodos(todos.map(todo=>todo.id ===id? {...todo, archived: !todo.archived}: todo))
	}
	
	const filteredTodos=todos.filter(todo=>{
		const matchesSearsh = todo.description.toLowerCase().includes(search.toLowerCase())
		switch (currentTab) {
			case "active":
				return matchesSearsh && !todo.completed && !todo.archived
			case "completed":
				return matchesSearsh && todo.completed && !todo.archived
			case "archived":
				return matchesSearsh && todo.archived
			default:
				return matchesSearsh
		}
	})

    return (
		<div className="app">
			<h1>Your ToDo List!</h1>



			<Search search={search} setSearch={setSearch}/>

		{/**lembre de alterar isso se necessario, aq q da bo nas tabs */}
			<Tabs accessKey={currentTab} onSelect={(key) => setCurrentTab(key)} className="mb-3">
				<Tab eventKey="active" title={`Active (${todos.filter(task => !task.completed && !task.archived).length})`}></Tab>
				<Tab eventKey="completed" title={`Completed (${todos.filter(task => task.completed && !task.archived).length})`}></Tab>
				<Tab eventKey="archived" title={`Archived (${todos.filter(task => task.archived).length})`}></Tab>
			</Tabs>

			<div className="todo-list">
				{filteredTodos.map((todo) => (//passar pro cadesno do caos, func array q percorre todos os itens do todo
					<Todo key={todo.id} todo = {todo} removeTodo={removeTodo} completeTodo={completeTodo} archivedTodo={archivedTodo}/>
				))}
			</div>
			{currentTab === "active" && <TodoForm addTodo={addTodo}/>}
		</div>
	);
}

export default App
