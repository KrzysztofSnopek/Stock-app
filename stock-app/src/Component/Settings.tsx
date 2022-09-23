import { Card } from "react-bootstrap"
import { StockNavbar } from './Dashboard'

export function Settings() {
  return (
    <div>
        <StockNavbar />
        <div className='mt-4 d-flex justify-content-center'>
        <Card className='mt-4' style={{ minHeight: '75vh', maxWidth: '600px'}}>
          <Card.Body>
            <h2 className='text-center mb-4'>
                <p>Password Change</p>
                <p>Theme Change Dark / Light</p>
            </h2>
          </Card.Body>
        </Card>
        </div>
  </div>
  )
}
