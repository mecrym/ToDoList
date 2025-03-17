import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Badge, Container, Row, Col } from "react-bootstrap";
import CalendarView from "./components/CalendarView";
import StatsView from "./components/StatsView";

const API_URL = "http://localhost:5000/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState("");
    const [currentTab, setCurrentTab] = useState("active");

    // Carregar tarefas do backend
    useEffect(() => {
        axios.get(API_URL).then(response => setTodos(response.data));
    }, []);

    const addTodo = (description, end_date) => {
        const newTodo = { description, end_date, completed: false, archived: false };
        axios.post(API_URL, newTodo).then(response => setTodos([...todos, response.data]));
    };

    const removeTodo = (id) => {
        axios.delete(`${API_URL}/${id}`).then(() => setTodos(todos.filter(todo => todo.id !== id)));
    };

    const updateTodo = (id, newDescription, newEndDate) => {
        axios.put(`${API_URL}/${id}`, { description: newDescription, end_date: newEndDate }).then(() =>
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, description: newDescription, end_date: newEndDate } : todo
            ))
        );
    };

    const completeTodo = (id) => {
        const todo = todos.find(todo => todo.id === id);
        axios.put(`${API_URL}/${id}`, { completed: !todo.completed }).then(() =>
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ))
        );
    };

    const archivedTodo = (id) => {
        const todo = todos.find(todo => todo.id === id);
        axios.put(`${API_URL}/${id}`, { archived: !todo.archived }).then(() =>
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, archived: !todo.archived } : todo
            ))
        );
    };

    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.description.toLowerCase().includes(search.toLowerCase());
        switch (currentTab) {
            case "all": return matchesSearch;
            case "active": return matchesSearch && !todo.completed && !todo.archived;
            case "completed": return matchesSearch && todo.completed && !todo.archived;
            case "archived": return matchesSearch && todo.archived;
            default: return matchesSearch;
        }
    });

    return (
        <Container className="py-4 p-4 mt-6 " style={{ maxWidth: "1200px" }}>
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
                        <Nav.Link eventKey="today">Today<Badge bg="primary">{todos.filter(t => {
                            const todoDate = new Date(t.end_date);
                            const today = new Date(); 
                            return todoDate.getDate() === today.getDate() && todoDate.getMonth() === today.getMonth() && todoDate.getFullYear() === today.getFullYear();
                            }).length}</Badge>
                        </Nav.Link>
                        <Nav.Item>
                            <Nav.Link eventKey="active">Active <Badge bg="primary">{todos.filter(t => !t.completed && !t.archived).length}</Badge></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="completed">Completed <Badge bg="success">{todos.filter(t => t.completed && !t.archived).length}</Badge></Nav.Link>
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

export default App;
