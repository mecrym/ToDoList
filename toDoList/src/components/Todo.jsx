import { useState } from "react"
import { Modal, Button, Form, Badge, Col } from "react-bootstrap"
import { Pencil, Check2, Archive, Trash, Calendar, Clock, BoxArrowInDown } from "react-bootstrap-icons"

const Todo = ({ todo, removeTodo, completeTodo, archivedTodo, updateTodo }) => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [editDescription, setEditDescription] = useState(todo.description)
    const [editEndDate, setEditEndDate] = useState(todo.end_date)
    const [editErrors, setEditErrors] = useState({
        description: false,
        end_date: false
    })

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const newErrors = {
            description: !editDescription.trim(),
            end_date: !editEndDate
        }

        setEditErrors(newErrors)

        if (!newErrors.description && !newErrors.end_date) {
            updateTodo(todo.id, editDescription, editEndDate)
            setShowEditModal(false)
        }
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className={`card h-100 ${todo.archived ? 'bg-light' : ''}`}>
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex gap-1 flex-wrap">
                            <Badge bg={todo.completed ? "success" : "warning"} className="mb-1">
                                {todo.completed ? <Check2 size={14} /> : <Clock size={14} />}
                            </Badge>
                            <Badge bg={todo.archived ? "secondary" : "info"} className="mb-1">
                                {todo.archived ? <BoxArrowInDown size={14} /> : <Archive size={14} />}
                            </Badge>
                        </div>
                        <small className="text-muted text-nowrap">
                            <Calendar className="me-1" size={12} />
                            {new Date(todo.end_date).toJSON().slice(0, 10)}
                        </small>
                    </div>

                    <p className="card-text flex-grow-1" style={{ 
                        textDecoration: todo.completed ? "line-through" : "",
                        opacity: todo.archived ? 0.6 : 1
                    }}>
                        {todo.description}
                    </p>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        {!todo.archived && (
                            <>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => setShowEditModal(true)}
                                    title="Edit"
                                >
                                    <Pencil size={16} />
                                </Button>
                                <Button 
                                    variant="outline-success" 
                                    size="sm"
                                    onClick={() => completeTodo(todo.id)}
                                    disabled={todo.completed}
                                    title="Complete"
                                >
                                    <Check2 size={16} />
                                </Button>
                            </>
                        )}
                        {todo.completed && (
                            <Button 
                                variant={todo.archived ? "outline-info" : "outline-secondary"} 
                                size="sm"
                                onClick={() => archivedTodo(todo.id)}
                                title={todo.archived ? "Unarchive" : "Archive"}
                            >
                                <Archive size={16} />
                            </Button>
                        )}
                        <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => setShowConfirm(true)}
                            title="Delete"
                        >
                            <Trash size={16} />
                        </Button>
                    </div>
                </div>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    isInvalid={editErrors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Description is required
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={editEndDate}
                                    onChange={(e) => setEditEndDate(e.target.value)}
                                    isInvalid={editErrors.end_date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Date is required
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete task: 
                        <strong> {todo.description}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => removeTodo(todo.id)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Col>
    )
}

export default Todo