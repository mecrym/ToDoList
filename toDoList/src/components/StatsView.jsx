import { Doughnut, Bar } from 'react-chartjs-2'
import { Card, Col, Row } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const StatsView = ({ todos }) => {
    const currentMonth = new Date().getMonth()
    
    const monthlyStats = todos.filter(todo => {
        const todoDate = new Date(todo.end_date)
        return todoDate.getMonth() === currentMonth
    })

    const donutData = {
        labels: ['Completed', 'Active'],
        datasets: [{
            label: 'Tasks',
            data: [
                monthlyStats.filter(t => t.completed).length,
                monthlyStats.filter(t => !t.completed && !t.archived).length
            ],
            backgroundColor: [
                '#28a745',
                '#007bff'
            ],
            hoverOffset: 4
        }]
    }

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayCounts = Array(7).fill(0)

    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const currentWeekTodos = todos.filter(todo => {
        const todoDate = new Date(todo.end_date)
        return todoDate >= startOfWeek && todoDate <= endOfWeek
    })

    currentWeekTodos.forEach(todo => {
        const day = new Date(todo.end_date).getDay()
        dayCounts[day]++
    })

    const barData = {
        labels: daysOfWeek,
        datasets: [{
            label: 'Tasks per Day (Current Week)',
            data: dayCounts,
            backgroundColor: '#17a2b8',
            borderWidth: 1
        }]
    }

    return (
        <Row className="g-4">
            <Col md={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Monthly Tasks Distribution</Card.Title>
                        <div style={{ height: '300px' }}>
                            <Doughnut 
                                data={donutData}
                                options={{ 
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: { position: 'bottom' }
                                    }
                                }}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Weekly Tasks Distribution</Card.Title>
                        <div style={{ height: '300px' }}>
                            <Bar 
                                data={barData}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: { stepSize: 1 }
                                        }
                                    },
                                    plugins: {
                                        legend: { display: false }
                                    }
                                }}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default StatsView