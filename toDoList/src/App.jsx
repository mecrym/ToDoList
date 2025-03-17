import { useState, useEffect } from "react"
import Todo from "./components/Todo"
import "./App.css"
import TodoForm from "./components/TodoForm"
import Search from "./components/Search"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, Badge, Container, Row, Col } from "react-bootstrap"
import CalendarView from "./components/CalendarView"
import StatsView from "./components/StatsView"

// Função para carregar os dados do localStorage
const loadTodos = () => {
  const savedTodos = localStorage.getItem('todos')
  return savedTodos ? JSON.parse(savedTodos) : [
    {
      id: 1,
      description: "finalizar projeto Robbson's",
      end_date: "2025-03-17",
      completed: false,
      archived: false
    },
    {
      id: 2,
      description: "prova",
      end_date: "2025-03-20",
      completed: false,
      archived: false
    },
    {
      id: 3,
      description: "campeonato de Regex",
      end_date: "2025-03-26",
      completed: false,
      archived: false
    }
  ]
}

function App() {
    const [todos, setTodos] = useState(loadTodos())
    const [search, setSearch] = useState("")
    const [currentTab, setCurrentTab] = useState("active")

    // Salvar no localStorage sempre que os todos mudarem
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (description, end_date) => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000),
            description,
            end_date,
            completed: false,
            archived: false
        }
        setTodos([...todos, newTodo])
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const updateTodo = (id, newDescription, newEndDate) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, description: newDescription, end_date: newEndDate } : todo
        ))
    }

    const completeTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const archivedTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, archived: !todo.archived } : todo
        ))
    }

    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.description.toLowerCase().includes(search.toLowerCase())
        switch (currentTab) {
            case "all": return matchesSearch
            case "active": return matchesSearch && !todo.completed && !todo.archived
            case "completed": return matchesSearch && todo.completed && !todo.archived
            case "archived": return matchesSearch && todo.archived
            default: return matchesSearch
        }
    })

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Your ToDo List!</h1>

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
                            <Nav.Link eventKey="all" className="text-nowrap">
                                All <Badge bg="secondary" pill>{todos.length}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="active" className="text-nowrap">
                                Active <Badge bg="primary" pill>{todos.filter(t => !t.completed && !t.archived).length}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="completed" className="text-nowrap">
                                Completed <Badge bg="success" pill>{todos.filter(t => t.completed && !t.archived).length}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="archived" className="text-nowrap">
                                Archived <Badge bg="dark" pill>{todos.filter(t => t.archived).length}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="stats" className="text-nowrap">
                                Stats
                            </Nav.Link>
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