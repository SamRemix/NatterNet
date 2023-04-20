// dependencies
import { Outlet } from 'react-router-dom'

// components
import Navbar from '../Navbar'
import Toasts from '../Toasts'

const Layout = () => (
  <>
    <Toasts />
    <Navbar />
    <Outlet />
  </>
)

export default Layout