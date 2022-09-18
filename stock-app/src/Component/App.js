import React from "react";
import { Container } from "react-bootstrap";
import { Signup } from './Signup'
import { AuthProvider } from '../Contexts/AuthContext'
import { Route, Routes} from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'

function App() {
  return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh'}}
      >
        <div className="w-100" style={{ maxWidth: '400px'}}>
          <AuthProvider>
            <Routes>           
                <Route path="/" element={ <Dashboard /> } />
                <Route path="/signup" element={ <Signup />} />
                <Route path="/login" element={ <Login />} />
            </Routes>
          </AuthProvider>
        </div>   
      </Container>      
  );
}

export default App;
