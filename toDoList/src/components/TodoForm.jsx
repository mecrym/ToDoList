import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'

const TodoForm = ({ addTodo }) => {
    const [description, setDescription] = useState("")
    const [end_date, setEnd_date] = useState("")
    const [errors, setErrors] = useState({
        description: false,
        end_date: false
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = {
            description: !description.trim(),
            end_date: !end_date
        }

        setErrors(newErrors)

        if (!newErrors.description && !newErrors.end_date) {
            addTodo(description, end_date)
            setDescription("")
            setEnd_date("")
            setErrors({ description: false, end_date: false })
        }
    }

    const handleReset = () => {
        setDescription("")
        setEnd_date("")
        setErrors({ description: false, end_date: false })
    }

    return (
        <div className="todo-form p-4 border rounded-3 bg-light mb-4">
            <h2 className="mb-2">New Task</h2>
            <Form onSubmit={handleSubmit} onReset={handleReset}>
                <Form.Group className="mb-1" controlId="formDescription">
                    <Form.Label>
                        Description <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="What's your task?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        isInvalid={errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a task description
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formDate">
                    <Form.Label>
                        Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={end_date}
                        onChange={(e) => setEnd_date(e.target.value)}
                        isInvalid={errors.end_date}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please select an end date
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" className="flex-grow-1">
                        Create Task
                    </Button>
                    <Button variant="secondary" type="reset" className="flex-grow-1">
                        Cancel
                    </Button>
                </div>

                {(errors.description || errors.end_date) && (
                    <Alert variant="danger" className="mt-3">
                        Please fill in all required fields
                    </Alert>
                )}
            </Form>
        </div>
    )
}

export default TodoForm