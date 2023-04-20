import { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import useFetch from '../../hooks/useFetch'
import useInputValue from '../../hooks/useInputValue'
import Container from '../../components/Container'
import logInAnimation from './motion.config'

const SignUp = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { setState } = useInputValue(setUser)

  const { fetchData } = useFetch({
    method: 'post',
    url: '/auth/log-in'
  })

  const logIn = async (e: any) => {
    e.preventDefault()

    fetchData({ ...user })
  }

  return (
    <Container title="Log in">
      <form className="form" onSubmit={logIn}>
        <Input
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={setState}
          animate={logInAnimation.emailInput}
        />

        <Input
          type="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={setState}
          animate={logInAnimation.passwordInput}
        />

        <Button animate={logInAnimation.submitButton}>Log in</Button>
      </form>
    </Container>
  )
}

export default SignUp