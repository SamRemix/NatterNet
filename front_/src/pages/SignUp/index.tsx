// dependencies
import { useState } from 'react'

// components
import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'

// hooks
import useFetch from '../../hooks/useFetch'
import useInputValue from '../../hooks/useInputValue'

// motion
import signUpAnimation from './motion.config'

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { setState } = useInputValue(setUser)

  const { fetchData } = useFetch({
    method: 'post',
    url: '/auth/sign-up'
  })

  const signup = async (e: any) => {
    e.preventDefault()

    fetchData({ ...user })
  }

  return (
    <Container title="Sign up">
      <form className="form" onSubmit={signup}>
        <Input
          placeholder="Name"
          value={user.name}
          name="name"
          onChange={setState}
          maxLength={32}
          autoFocus={true}
          animate={signUpAnimation.nameInput}
        />

        <Input
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={setState}
          animate={signUpAnimation.emailInput}
        />

        <Input
          type="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={setState}
          passwordValidation={true}
          animate={signUpAnimation.passwordInput}
        />

        <Button animate={signUpAnimation.submitButton}>Sign up</Button>
      </form>
    </Container>
  )
}

export default SignUp