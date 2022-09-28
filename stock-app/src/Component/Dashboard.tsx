import { useState} from 'react'
import { Card, Button, Alert, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import { FaWrench, FaUserAlt, FaPowerOff, FaChartLine } from 'react-icons/fa'
import { Stock } from './Stock'

export function StockNavbar() {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState<string>('')
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
    <Navbar className="navbar navbar-dark bg-primary d-flex justify-content-between">
    <div className='navbar-nav'>
      <Link to='/' className='btn btn-primary mt-1 ms-4'>
        <h5>
          <strong className='pe-2'>
            <FaChartLine />
          </strong>
          <strong>
            StockAPP
          </strong>
        </h5>
      </Link>
    </div>
    <div className='navbar-nav me-4'>
     <Link to='/' className='btn btn-primary'>
       <FaUserAlt /> {currentUser?.email}
     </Link>
     <Link to='/edit-settings' className='btn btn-primary'>
       <FaWrench /> Settings
     </Link>
     <div>
       <Button onClick={handleLogOut} className='btn btn-primary'><FaPowerOff /> Log Out</Button>
     </div>
    </div> 
  </Navbar>
  )
}


export function Dashboard() {
  const [error, setError] = useState<string>('')

  return (
    <div>
      <StockNavbar />
      <div className='mt-4 d-flex justify-content-center'>
        <Card style={{minWidth: '800px'}}>
          <Card.Body>
            <div className='text-center mb-4'>
                <Stock />
            </div>
            {error && <Alert variant='danger'>{error}</Alert>}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
