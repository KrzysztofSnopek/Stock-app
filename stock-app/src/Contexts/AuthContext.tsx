import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, User, UserCredential } from 'firebase/auth';



export function useAuth() {
    return useContext(AuthContext)
}

interface Props {
  children: React.ReactNode
}

type AuthContextType = {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential | void>
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: (email: string, password: string) => Promise.resolve()
});

export function AuthProvider( {children}: Props ): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
