import { useState, useEffect } from "react"
import axios from "axios"
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from "./components/TodoForm"
import Search from "./components/Search"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Badge, Container, Row, Col } from "react-bootstrap"
import CalendarView from "./components/CalendarView"
import StatsView from "./components/StatsView"

const API_URL = "http://localhost:5000/todos"

function App() {
    const [todos, setTodos] = useState([])
    const [search, setSearch] = useState("")
    const [currentTab, setCurrentTab] = useState("active")

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setTodos(response.data))
            .catch(error => console.error("Erro ao buscar tarefas:", error))
    }, [])

    const addTodo = (description, end_date) => {
        const newTodo = { description, end_date, completed: false, archived: false }
        axios.post(API_URL, newTodo)
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error("Erro ao adicionar tarefa:", error))
    }

    const removeTodo = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error("Erro ao remover tarefa:", error))
    }

    const updateTodo = (id, newDescription, newEndDate) => {
        axios.put(`${API_URL}/${id}`, { description: newDescription, end_date: newEndDate })
            .then(() => setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, description: newDescription, end_date: newEndDate } : todo
            )))
            .catch(error => console.error("Erro ao atualizar tarefa:", error))
    }

    const completeTodo = (id) => {
        const todo = todos.find(todo => todo.id === id)
        axios.put(`${API_URL}/${id}`, { completed: !todo.completed })
            .then(() => setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )))
            .catch(error => console.error("Erro ao completar tarefa:", error))
    }

    const archivedTodo = (id) => {
        const todo = todos.find(todo => todo.id === id)
        if (todo.completed) {
            axios.put(`${API_URL}/${id}`, { archived: !todo.archived })
                .then(() => setTodos(todos.map(todo =>
                    todo.id === id ? { ...todo, archived: !todo.archived } : todo
                )))
                .catch(error => console.error("Erro ao arquivar tarefa:", error))
        }
    }

    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.description.toLowerCase().includes(search.toLowerCase())
        const isToday = new Date(todo.end_date).toDateString() === new Date().toDateString()
        
        switch (currentTab) {
            case "all": return matchesSearch
            case "active": return matchesSearch && !todo.completed && !todo.archived
            case "completed": return matchesSearch && todo.completed && !todo.archived
            case "archived": return matchesSearch && todo.archived
            case "today": return matchesSearch && isToday
            default: return matchesSearch
        }
    })

    return (
        <Container className="py-4 p-4 mt-6 " style={{ maxWidth: "1200px" }}>
            <h1 className="text-center mb-4">Your To Do List!</h1>

            <Search search={search} setSearch={setSearch} />

            <Row className="g-4">
                <Col md={4} lg={3}>
                    <div className="sticky-top" style={{ top: '1rem' }}>
                        <TodoForm addTodo={addTodo} />
                        <CalendarView todos={todos} />
                    </div>
                </Col>

                <Col md={8} lg={9}>
                    <Nav 
                        variant="tabs"
                        activeKey={currentTab}
                        onSelect={setCurrentTab}
                        className="mb-3 flex-nowrap overflow-auto"
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="all">All <Badge bg="secondary">{todos.length}</Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="today">
                                Today<Badge bg="primary">
                                    {todos.filter(t => 
                                        new Date(t.end_date).toDateString() === new Date().toDateString()
                                    ).length}
                                </Badge>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="active">Active <Badge bg="primary">{todos.filter(t => !t.completed && !t.archived).length}</Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="archived">Archived <Badge bg="dark">{todos.filter(t => t.archived).length}</Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="stats">Stats</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {currentTab === 'stats' ? (
                        <StatsView todos={todos} />
                    ) : (
                        <Row className="g-4">
                            {filteredTodos.map(todo => (
                                <Todo 
                                    key={todo.id} 
                                    todo={todo} 
                                    removeTodo={removeTodo}
                                    completeTodo={completeTodo}
                                    archivedTodo={archivedTodo}
                                    updateTodo={updateTodo}
                                />
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default App