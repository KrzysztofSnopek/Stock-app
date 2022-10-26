import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      if (emailRef.current) {
      setMessage('')
      setLoading(true)
      await resetPassword(emailRef.current.value) 
      setMessage('Check yout inbox for further information')
    }} catch {
      setError('Failed to reset password')
    }  
    setLoading(false)
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh', maxWidth: '400px'}}
      >
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>
              Password Reset
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}            
            {message && <Alert variant='success'>{message}</Alert>}            
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} autoComplete="off" required />
              </Form.Group>

              <Button disabled={loading} className='w-100 mt-3' type='submit'>
                Reset Password
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/login'>Log in</Link>
            </div>            
          </Card.Body>
          <Card.Footer>
            <div className='w-100 text-center'>
                Do you need an account? <Link to='/signup'>Sign up</Link>
            </div>
          </Card.Footer>
        </Card>
      </Container>
      </>
  )
}
