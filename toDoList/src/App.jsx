import { useState } from "react"
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from "./components/TodoForm";

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
			end_date: "2025-03-0",
			completed: false,
			archived: false,
		}
	])
    return (
		<div className="app">
			<h1>Your ToDo List!</h1>
			<div className="todo-list">
				{todos.map((todo) => (//passar pro cadesno do caos, func array q percorre todos os itens do todo
					<Todo todo = {todo} />
				))}
			</div>
			<TodoForm/>
		</div>
	);
}

export default App
