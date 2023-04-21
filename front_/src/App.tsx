// dependencies
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'

// components
import Layout from './components/Layout'
import { AnimatePresence } from 'framer-motion'
import { memo } from 'react'

const App = () => {
  const location = useLocation()
  return (
    <>
      <Layout />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.key}>
          <Route index element={<Home />} />

          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default memo(App)
