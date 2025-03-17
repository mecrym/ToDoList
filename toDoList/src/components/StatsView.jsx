import { Doughnut, Bar } from 'react-chartjs-2'
import { Card, Col, Row } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const StatsView = ({ todos }) => {
    // Dados para o gráfico de donut
    const currentMonth = new Date().getMonth()
    
    const monthlyStats = todos.filter(todo => {
        const todoDate = new Date(todo.end_date)
        return todoDate.getMonth() === currentMonth
    })

    const donutData = {
        labels: ['Completed', 'Archived', 'Active'],
        datasets: [{
            label: 'Tasks',
            data: [
                monthlyStats.filter(t => t.completed).length,
                monthlyStats.filter(t => t.archived).length,
                monthlyStats.filter(t => !t.completed && !t.archived).length
            ],
            backgroundColor: [
                '#28a745',
                '#6c757d',
                '#007bff'
            ],
            hoverOffset: 4
        }]
    }

    // Dados para o gráfico de barras
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayCounts = Array(7).fill(0)

    todos.forEach(todo => {
        const day = new Date(todo.end_date).getDay()
        dayCounts[day]++
    })

    const barData = {
        labels: daysOfWeek,
        datasets: [{
            label: 'Tasks per Day',
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
                        <Card.Title>Tasks by Week Day</Card.Title>
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
