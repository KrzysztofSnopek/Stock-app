import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      if (emailRef.current && passwordRef.current) {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value) 
      navigate('/')
    }} catch {
      setError('Failed to log in')
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
              Log in
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} autoComplete="off" required />
              </Form.Group>

              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} autoComplete="off" required />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-3' type='submit'>
                Log in
              </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to='/forgot-password'>Forgot password?</Link>
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