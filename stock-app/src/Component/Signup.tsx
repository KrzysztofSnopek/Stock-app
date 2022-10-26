import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export function Signup() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault()

    if ((passwordRef.current && passwordConfirmRef.current) && (passwordRef.current.value !== passwordConfirmRef.current.value)) {
      return setError('Password is not correct')
    }

    try {
      if (emailRef.current && passwordRef.current) {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value) 
      navigate('/')
    }} catch {
      setError('Failed to create an account')
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
              Sign Up
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit} autoComplete="off" >
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} autoComplete="off" required />
              </Form.Group>

              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} autoComplete="off" required />
              </Form.Group>

              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} autoComplete="off" required />
              </Form.Group>

              <Button disabled={loading} className='w-100' type='submit'>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className='w-100 text-center mt-2'>
              Already have an account? <Link to='/login'>Log in</Link>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}
