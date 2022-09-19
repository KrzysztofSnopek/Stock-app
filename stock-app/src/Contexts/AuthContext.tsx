import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';

export function useAuth(): AuthContextData {
    const contextValue = useContext(AuthContext)
    if (contextValue === null) {
      throw new Error ("useAuth must be used within AuthProvider")
    }
    return contextValue
}

interface Props {
  children: React.ReactNode
}

interface AuthContextData {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextData | null>(null);

export function AuthProvider( {children}: Props ): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signup,
    login, 
    logout
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

