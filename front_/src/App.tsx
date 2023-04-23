// dependencies
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// pages
import Home from './pages/Home'
import AddAlbum from './pages/AddAlbum'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'

// components
import Layout from './components/Layout'
import Reviews from './pages/Reviews'

const App = () => {
  const location = useLocation()

  return (
    <>
      <Layout />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.key}>
          <Route index element={<Home />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="add-album" element={<AddAlbum />} />

          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
