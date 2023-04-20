// dependencies
// import { useContext } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'

// pages
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'

// components
import Layout from './components/Layout'

// auth context
// import { AuthContext } from './contexts/AuthContext'
// import { AuthContextProps } from './@types/authContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="profile" element={<Profile />}>
        <Route path=":id" />
      </Route>

      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn />} />
    </Route>
  )
)

const App = () => <RouterProvider router={router} />

export default App
