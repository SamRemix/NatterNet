import './styles.scss'
import { NavLink } from 'react-router-dom'
import { topLinks, bottomLinks } from './links'
import Button from '../Button'

const Navbar = () => {
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
        {bottomLinks.map(({ path, icon: Icon, label }) => (
          <NavLink className="link" to={path} key={label}>
            <Icon width="1.5rem" strokeWidth={1} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar