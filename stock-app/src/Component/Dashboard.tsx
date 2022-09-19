import { useState} from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'


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
    <>
      <Card>
        <Card.Body>
        <h2 className='text-center mb-4'>
            Log in
          </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <Link to='/edit-settings' className='btn btn-primary w-100 mt-3'>Edit Settings</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogOut}>Log Out</Button>
      </div>
    </>
  )
}
