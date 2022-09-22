import { useState} from 'react'
import { Card, Button, Alert, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import { FaWrench, FaUserAlt, FaPowerOff, FaChartLine } from 'react-icons/fa'


export function Dashboard() {
const [error, setError] = useState<string>('')
const { currentUser, logout } = useAuth()
const navigate = useNavigate()

async function handleLogOut(): Promise<void> {
  setError('')
  try {
    await logout()
    navigate('/login')
  } catch {
    setError('Failed to log out')
  }
}

  return (
    <div>
      <Navbar className="navbar navbar-dark bg-primary d-flex justify-content-between">
        <div className='navbar-nav'>
          <a className='nav-link active mt-1 ms-4'>
             <h5><strong><FaChartLine /> StockAPP</strong></h5>
          </a>
        </div>
        <div className='navbar-nav me-4'>
         <a className='nav-link active'>
           <FaUserAlt /> {currentUser?.email}
         </a>
         <Link to='/edit-settings' className='btn btn-primary'>
           <FaWrench /> Settings
         </Link>
         <div>
           <Button onClick={handleLogOut} className='btn btn-primary'><FaPowerOff /> Log Out</Button>
         </div>
        </div> 
      </Navbar>

      <div className='mt-4 d-flex justify-content-center'>
        <Card className='mt-4' style={{ minHeight: '75vh', maxWidth: '600px'}}>
          <Card.Body>
          <h2 className='text-center mb-4'>
              Placeholder for the stock market
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
