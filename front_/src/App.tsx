import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import { AuthContextProps } from './@types/authContext'
import Toasts from './components/Toasts'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  const location = useLocation()

  const { token } = useContext(AuthContext) as AuthContextProps

  return (
    <>
      <Layout />

      <Toasts />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />

          <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to={'/'} />} />
          <Route path="/log-in" element={!token ? <LogIn /> : <Navigate to={'/'} />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
