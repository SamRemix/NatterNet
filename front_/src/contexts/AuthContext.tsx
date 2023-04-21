// dependencies
import { createContext, useEffect, useState } from 'react'

// types
import { AuthContextProps } from '../@types/authContext'
import { ChildrenProps } from '../@types/children'

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState<any>(null)

  const register = (auth: any) => {
    localStorage.setItem('auth', JSON.stringify({ user: auth.user.id, token: auth.token }))

    return setAuth({ user: auth.user.id, token: auth.token })
  }

  const logOut = () => {
    localStorage.removeItem('auth')

    return setAuth(null)
  }

  const store = localStorage.getItem('auth')

  useEffect(() => {
    if (!store) return

    setAuth(JSON.parse(store))
  }, [store])

  console.log('AUTH_CONTEXT', auth)

  return (
    <AuthContext.Provider value={{ auth, register, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider