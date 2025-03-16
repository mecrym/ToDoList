import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Todo = ({todo, removeTodo, completeTodo, archivedTodo, updateTodo}) => {//uma props do caderninho, está basicamente passando por parametro
    /**aq começa a parte relacionada ao pop-up */
    const [showConfirm, setShowConfirm] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)
    const [editDescription, setEditDescription] = useState(todo.description)
    const [editEndDate, setEditEndDate] = useState(todo.end_date)

    const handleEditSubmit = (event) => {
        event.preventDefault()
        updateTodo(todo.id, editDescription, editEndDate)
        setShowEditModal(false)
    }
    const handleClose = () => setShowConfirm(false)
    const handleConfirm = () => {
        removeTodo(todo.id)
        handleClose()
    }

    return(
        <div className="todo">
            <div className="content" style={{textDecoration: todo.completed ? "line-through" : ""}}>
                <p>{todo.end_date}</p>
                <p className="description">{todo.description}</p>
            </div>
            <div>
            <Button variant="primary" onClick={() => setShowEditModal(true)}>Edit</Button>
            <Button variant="success" onClick={() => completeTodo(todo.id)}>Finished</Button>
            <Button variant="warning" onClick={() => archivedTodo(todo.id)}>Archive</Button>

            <Button variant="danger" onClick={() => setShowConfirm(true)} className="remove">Delete</Button>

            {/*aq começa o modal */}
            {/**update */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/**delete */}
            <Modal show={showConfirm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Exclude
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you realy wish to delete this task? "{todo.description}"
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirm}>Confirm</Button>
                </Modal.Footer>                    
            </Modal>
            </div>
        </div>
    )
}

export default Todo