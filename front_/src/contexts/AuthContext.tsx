import { createContext, useEffect, useState } from 'react'
import { AuthContextProps } from '../@types/authContext'
import { ChildrenProps } from '../@types/children'

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: ChildrenProps) => {
  const [token, setToken] = useState<string | null>(null)

  const register = (token: string) => {
    localStorage.setItem('token', token)

    return setToken(token)
  }

  const logOut = () => {
    localStorage.removeItem('token')

    return setToken(null)
  }

  const store = localStorage.getItem('token')

  useEffect(() => {
    if (!store) return

    setToken(store)
  }, [store])

  console.log('AUTH_CONTEXT', token)

  return (
    <AuthContext.Provider value={{ token, register, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider