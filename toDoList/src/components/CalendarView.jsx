import { useState } from "react"
import { Modal, Button, Badge, Row, Col } from "react-bootstrap"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, startOfWeek, endOfWeek, isSameDay} from "date-fns"
import { enUS } from "date-fns/locale"

const CalendarView = ({ todos }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [showDateTasks, setShowDateTasks] = useState(false)

    const getCalendarGrid = () => {
        const monthStart = startOfMonth(currentMonth)
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
        const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 })
        
        const days = eachDayOfInterval({ start: startDate, end: endDate })
        
        const weeks = []
        while (days.length) {
            weeks.push(days.splice(0, 7))
        }
        return weeks
    }

    const countTasksByDate = (date) => {
        return todos.filter(todo => {
            const todoDate = new Date(todo.end_date)
            return isSameDay(todoDate, date)
        }).length
    }

    const changeMonth = (direction) => {
        setCurrentMonth(new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1
        ))
    }

    const getDateTasks = () => {
        return todos.filter(todo => {
            const todoDate = new Date(todo.end_date)
            return selectedDate && isSameDay(todoDate, selectedDate)
        })
    }

    const weeks = getCalendarGrid()

    return (
        <div className="calendar-view mb-5">
            <div className="month-navigation d-flex justify-content-between align-items-center mb-2">
                <Button variant="secondary" onClick={() => changeMonth(-1)}>
                    &lt; 
                </Button>
                <h3 className="mb-0 text-capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: enUS })}
                </h3>
                <Button variant="secondary" onClick={() => changeMonth(1)}>
                    &gt;
                </Button>
            </div>

            <div className="d-none d-md-block">
                <Row className="week-days mb-2 g-0">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                        <Col 
                            key={day}
                            className="text-center fw-bold py-2 border"
                            style={{
                                flex: '0 0 14.2857%',
                                maxWidth: '14.2857%'
                            }}
                        >
                            {day}
                        </Col>
                    ))}
                </Row>

                {weeks.map((week, weekIndex) => (
                    <Row key={weekIndex} className="g-0">
                        {week.map((date, dayIndex) => {
                            const isCurrentMonth = isSameMonth(date, currentMonth)
                            const taskCount = countTasksByDate(date)

                            return (
                                <Col 
                                    key={dayIndex}
                                    className={`calendar-day p-2 border ${!isCurrentMonth ? "bg-light text-muted" : ""}`}
                                    style={{
                                        flex: '0 0 14.2857%',
                                        maxWidth: '14.2857%',
                                        minmaxHeight: 'fit-content',
                                        cursor: 'pointer',
                                        color: isSameDay(date, new Date()) ? "#fff" : "inherit",
                                        backgroundColor: isSameDay(date, new Date()) ? "#1e3c72" : "inherit"
                                    }}
                                    onClick={() => {
                                        setSelectedDate(date)
                                        setShowDateTasks(true)
                                    }}
                                >
                                    <div className="d-flex flex-column h-100 justify-content-start align-items-center">
                                        <div className="fw-bold mb-2">{format(date, "d")}</div>
                                        <div className="mt-auto">
                                            {taskCount > 0 && (
                                                <Badge bg="primary" pill className="mx-auto">
                                                    {taskCount}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                ))}
            </div>

            <div className="d-md-none mobile-calendar">
                <div className="d-flex flex-nowrap overflow-x-auto pb-2 px-2">
                    {eachDayOfInterval({
                        start: startOfMonth(currentMonth),
                        end: endOfMonth(currentMonth)
                    }).map((date) => {
                        const isCurrentMonth = isSameMonth(date, currentMonth)
                        const taskCount = countTasksByDate(date)

                        return (
                            <div 
                                key={date}
                                className="flex-shrink-0 me-2 text-center"
                                style={{ width: '75px' }}
                            >
                                <div 
                                    className={`p-2 rounded ${!isCurrentMonth ? "bg-light text-muted" : "border"}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedDate(date)
                                        setShowDateTasks(true)
                                    }}
                                >
                                    <div className="small text-uppercase">
                                        {format(date, "EEE", { locale: enUS })}
                                    </div>
                                    <div className="fw-bold my-1">{format(date, "d")}</div>
                                    {taskCount > 0 && (
                                        <Badge bg="primary" pill className="d-block mx-auto">
                                            {taskCount}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Modal show={showDateTasks} onHide={() => setShowDateTasks(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tasks for {selectedDate && format(selectedDate, "MMM dd", { locale: enUS })}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {getDateTasks().length === 0 ? (
                        <p>No tasks for this day</p>
                    ) : (
                        <div className="list-group">
                            {getDateTasks().map(todo => (
                                <div key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                        {todo.description}
                                    </span>
                                    <Badge bg={todo.completed ? "success" : "warning"}>
                                        {todo.completed ? "Completed" : "Pending"}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CalendarView