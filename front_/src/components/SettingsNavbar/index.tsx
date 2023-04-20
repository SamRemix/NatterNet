import './styles.scss'
import { NavLink } from 'react-router-dom'
import { links } from './links'

const SettingsNavbar = () => {
  return (
    <nav className="settings-navbar">
      {links.map(({ path, icon: Icon, label }) => (
        <NavLink className="link" to={path}>
          <Icon width="1.5rem" strokeWidth={1} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default SettingsNavbar