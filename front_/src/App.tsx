import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { useContext } from 'react'
import { AuthContext, AuthContextProps } from './contexts/AuthContext'

const App = () => {
  const { token } = useContext(AuthContext) as AuthContextProps

  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path="/log-in" element={!token ? <LogIn /> : <Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

export default App
