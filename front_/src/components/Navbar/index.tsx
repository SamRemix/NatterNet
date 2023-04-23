import './styles.scss'

// dependencies
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  PlusIcon,
  UserPlusIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

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

  const { response: users }: any = useFetch({
    method: 'get',
    url: '/users',
    requireAuth: true
  })

  const user = users?.find((user: any) => user.id === auth?.user)

  const iconAttr = {
    width: '1.5rem',
    strokeWidth: 1
  }

  return (
    <nav className="navbar">
      <div className="navbar-section">
        <div className="navbar-section-menu">
          <Button type="back" />
          <h1 className="navbar-section-menu-title">Menu</h1>

          <NavLink className="link" to="/">
            <div className="icon">
              <HomeIcon {...iconAttr} />
            </div>
            <p>Home</p>
          </NavLink>

          <NavLink className="link" to="reviews">
            <div className="icon">
              <MusicalNoteIcon {...iconAttr} />
            </div>
            <p>Albums reviews</p>
          </NavLink>
        </div>

        {user?.isAdmin && <div className="navbar-section-menu">
          <h1 className="navbar-section-menu-title">Admin</h1>

          <NavLink className="link" to="add-album">
            <div className="icon">
              <PlusIcon {...iconAttr} />
            </div>
            <p>Add album</p>
          </NavLink>
        </div>}
      </div>

      <div className="navbar-section">
        <div className="navbar-section-menu">
          <h1 className="navbar-section-menu-title">Auth</h1>

          {!auth?.token
            ? (
              <>
                <NavLink className="link" to="sign-up">
                  <div className="icon">
                    <UserPlusIcon {...iconAttr} />
                  </div>
                  <p>Sign up</p>
                </NavLink>

                <NavLink className="link" to="log-in">
                  <div className="icon">
                    <ArrowLeftOnRectangleIcon {...iconAttr} />
                  </div>
                  <p>Log in</p>
                </NavLink>
              </>
            )
            : (
              <div className="link logout" onClick={() => {
                addToast({ message: 'You\'re offline, bye 👋' })
                logOut()
              }}>
                <div className="icon">
                  <ArrowRightOnRectangleIcon {...iconAttr} />
                </div>
                <p>Log out</p>
              </div>
            )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar