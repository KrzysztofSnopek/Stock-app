import React from "react";
import { Signup } from './Signup'
import { AuthProvider } from '../Contexts/AuthContext'
import { Route, Routes} from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Login } from './Login'
import { Settings } from './Settings'

function App() {
  return (
        <div className="w-100">
          <AuthProvider>
            <Routes>           
                <Route path="/" element={ <Dashboard /> } />
                <Route path="/signup" element={ <Signup />} />
                <Route path="/login" element={ <Login />} />
                <Route path="/edit-settings" element={ <Settings />} />
            </Routes>
          </AuthProvider>
        </div>        
  );
}

export default App;
