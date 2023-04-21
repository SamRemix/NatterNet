import './styles.scss'

// dependencies
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, HomeIcon, LockClosedIcon, UserPlusIcon } from '@heroicons/react/24/outline'

// components + links
import Button from '../Button'

// contexts
import { AuthContext } from '../../contexts/AuthContext'

// hooks
import useFetch from '../../hooks/useFetch'
import useToasts from '../../hooks/useToasts'

// types
import { AuthContextProps } from '../../@types/authContext'

const Navbar = () => {
  const { auth, logOut } = useContext(AuthContext) as AuthContextProps

  const { addToast } = useToasts()

  const { response: user }: any = useFetch({
    method: 'get',
    url: `/users/${auth?.user}`,
    requireAuth: true
  })

  const iconAttr = {
    width: '1.5rem',
    strokeWidth: 1
  }

  return (
    <nav className="navbar">
      <div className="navbar-section">
        <Button type="back" />
        <h1 className="navbar-title">Remix</h1>

        <NavLink className="link" to="/">
          <HomeIcon {...iconAttr} />
          <p>Home</p>
        </NavLink>

        {user?.isAdmin && (
          <NavLink className="link" to="admin">
            <LockClosedIcon {...iconAttr} />
            <p>Admin</p>
          </NavLink>
        )}
      </div>

      <div className="navbar-section">
        {!auth?.token
          ? (
            <>
              <NavLink className="link" to="sign-up">
                <UserPlusIcon {...iconAttr} />
                <p>Sign up</p>
              </NavLink>

              <NavLink className="link" to="log-in">
                <ArrowLeftOnRectangleIcon {...iconAttr} />
                <p>Log in</p>
              </NavLink>
            </>
          )
          : (
            <div className="link logout" onClick={() => {
              addToast({ message: 'You\'re offline, bye 👋' })
              logOut()
            }}>
              <ArrowRightOnRectangleIcon {...iconAttr} />
              Log out
            </div>
          )}
      </div>
    </nav>
  )
}

export default Navbar