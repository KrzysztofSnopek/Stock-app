import { StockNavbar } from './Dashboard'
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export function Settings() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { currentUser, changeEmail, changePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault()

    if ((passwordRef.current && passwordConfirmRef.current) && (passwordRef.current.value !== passwordConfirmRef.current.value)) {
      return setError('Password is not correct')
    }

    const promises = []
    setError('')
    setLoading(true)

    if (emailRef.current?.value !== currentUser?.email && emailRef.current?.value) {
      promises.push(changeEmail(emailRef.current?.value))
    }
    if (passwordRef.current?.value) {
      promises.push(changePassword(passwordRef.current?.value))
    }

    Promise.all(promises).then(() => {
      navigate('/')
    }).catch(() => {
      setError('Failed to update the account')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <StockNavbar />
      <Container
        className="d-flex align-items-center justify-content-center mt-5"
        style={{ maxWidth: '400px'}}
      >
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>
              Password change
            </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit} autoComplete="off" >
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} autoComplete="off" required defaultValue={currentUser?.email || undefined} />
              </Form.Group>

              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} autoComplete="off" required />
              </Form.Group>

              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} autoComplete="off" required />
              </Form.Group>

              <Button disabled={loading} className='w-100 mt-3' type='submit'>
                Update
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className='w-100 text-center mt-2'>
              <Link to='/'>Cancel</Link>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}