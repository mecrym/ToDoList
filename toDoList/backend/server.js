const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Porta do Vite/React
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

const DB_FILE = 'db.json'

const loadTodos = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2))
    }

    try {
        const data = fs.readFileSync(DB_FILE, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveTodos = (todos) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2))
}

app.get('/todos', (req, res) => {
    res.json(loadTodos())
})

app.post('/todos', (req, res) => {
    const todos = loadTodos()
    const newTodo = { id: Date.now(), ...req.body }
    todos.push(newTodo)
    saveTodos(todos)
    res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
    let todos = loadTodos()
    todos = todos.map(todo => (todo.id == req.params.id ? { ...todo, ...req.body } : todo))
    saveTodos(todos)
    res.json({ message: 'Tarefa atualizada' })
})

app.delete('/todos/:id', (req, res) => {
    let todos = loadTodos()
    todos = todos.filter(todo => todo.id != req.params.id)
    saveTodos(todos)
    res.json({ message: 'Tarefa removida' })
})

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
