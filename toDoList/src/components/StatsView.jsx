import { Doughnut } from 'react-chartjs-2'
import { Card, Col, Row } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

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
            backgroundColor: ['#28a745', '#007bff'],
            hoverOffset: 4
        }]
    }

    return (
        <Row className="g-4">
            <Col md={12}>
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
        </Row>
    )
}

export default StatsView
