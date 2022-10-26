import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential, updateEmail, updatePassword } from 'firebase/auth';

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
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
  changeEmail: (email: string) => Promise<void> | undefined
  changePassword: (password: string) => Promise<void> | undefined
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

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email).then((a) => {
      alert("Password reset email sent")
    })
  }

  function changeEmail (email: string) {
    if (auth.currentUser !== null) {
    return updateEmail(auth.currentUser, email)
    }
  }

  function changePassword (password: string) {
    if (auth.currentUser !== null) {
      return updatePassword(auth.currentUser, password)
    }
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
    logout,
    resetPassword,
    changeEmail,
    changePassword
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

