import React from "react";

const Todo = ({todo}) => {//uma props do caderninho
    return(
        <div className="todo">
            <div className="content">
                <p>{todo.end_date}</p>
                <p className="description">{todo.description}</p>
            </div>
            <div>
                <button>Finished</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Todo