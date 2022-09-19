import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth';



export function useAuth() {
    return useContext(AuthContext)
}

interface Props {
  children: React.ReactNode
}

type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential | void>
  login: (email: string, password: string) => Promise<UserCredential | void>
  logout: any
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: (email: string, password: string) => Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve()
});

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

