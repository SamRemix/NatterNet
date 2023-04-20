import './styles.scss'

// dependencies
import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

// components + links
import Button from '../Button'

// contexts
import { AuthContext } from '../../contexts/AuthContext'

// hooks
import useToasts from '../../hooks/useToasts'

// types
import { AuthContextProps } from '../../@types/authContext'

// other
import { topLinks, bottomLinks } from './links'


const Navbar = () => {
  const { pathname } = useLocation()

  const { token, logOut } = useContext(AuthContext) as AuthContextProps

  const { addToast } = useToasts()

  return (
    <nav className="navbar">
      <div className="navbar-section">
        <Button type="back" />
        <h1 className="navbar-title">Remix</h1>
        {topLinks.map(({ path, icon: Icon, label }) => (
          <NavLink className="link" to={path} key={label}>
            <Icon width="1.5rem" strokeWidth={1} />
            {label}
          </NavLink>
        ))}

        <NavLink className={`${pathname.startsWith('/settings') ? 'link active' : 'link'}`} to="settings/profile">
          <Cog6ToothIcon width="1.5rem" strokeWidth={1} />
          Settings
        </NavLink>
      </div>

      <div className="navbar-section">
        {!token
          ? bottomLinks.map(({ path, icon: Icon, label }) => (
            <NavLink className="link" to={path} key={label}>
              <Icon width="1.5rem" strokeWidth={1} />
              {label}
            </NavLink>
          ))
          : <div className="link logout" onClick={() => {
            addToast({ message: 'You\'re offline, bye 👋' })
            logOut()
          }}>
            <ArrowRightOnRectangleIcon width="1.5rem" strokeWidth={1} />
            Log out
          </div>}
      </div>
    </nav>
  )
}

export default Navbar