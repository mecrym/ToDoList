import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Todo = ({todo, removeTodo, completeTodo, archivedTodo}) => {//uma props do caderninho, está basicamente passando por parametro
    /**aq começa a parte relacionada ao pop-up */
    const [showConfirm, setShowConfirm] = useState(false)

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
            <Button variant="success" onClick={() => completeTodo(todo.id)}>Finished</Button>
            <Button variant="warning" onClick={() => archivedTodo(todo.id)}>Archive</Button>

            <Button variant="danger" onClick={() => setShowConfirm(true)} className="remove">Delete</Button>

            {/*aq começa o modal */}
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