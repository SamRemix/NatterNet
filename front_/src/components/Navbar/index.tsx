import './styles.scss'
import { NavLink } from 'react-router-dom'
import { topLinks, bottomLinks } from './links'
import Button from '../Button'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { AuthContextProps } from '../../@types/authContext'
import useToasts from '../../hooks/useToasts'


const Navbar = () => {
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