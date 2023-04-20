// dependencies
import { Outlet } from 'react-router-dom'

// components
import Container from '../../components/Container'
import SettingsNavbar from '../../components/SettingsNavbar'

const Settings = () => {
  return (
    <Container title="Settings">
      <SettingsNavbar />
      <Outlet />
    </Container>
  )
}

export default Settings