// dependencies
import { Outlet } from 'react-router-dom'

// components
import Container from '../../components/Container'

const Profile = () => {
  return (
    <Container title="Profile">
      <Outlet />
    </Container>
  )
}

export default Profile