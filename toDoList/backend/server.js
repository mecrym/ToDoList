const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const DB_FILE = 'db.json';

// Função para carregar as tarefas
const loadTodos = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Função para salvar as tarefas
const saveTodos = (todos) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
};

// Rota para buscar todas as tarefas
app.get('/todos', (req, res) => {
    res.json(loadTodos());
});

// Rota para adicionar uma nova tarefa
app.post('/todos', (req, res) => {
    const todos = loadTodos();
    const newTodo = { id: Date.now(), ...req.body };
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
});

// Rota para atualizar uma tarefa
app.put('/todos/:id', (req, res) => {
    let todos = loadTodos();
    todos = todos.map(todo => (todo.id == req.params.id ? { ...todo, ...req.body } : todo));
    saveTodos(todos);
    res.json({ message: 'Tarefa atualizada' });
});

// Rota para excluir uma tarefa
app.delete('/todos/:id', (req, res) => {
    let todos = loadTodos();
    todos = todos.filter(todo => todo.id != req.params.id);
    saveTodos(todos);
    res.json({ message: 'Tarefa removida' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
