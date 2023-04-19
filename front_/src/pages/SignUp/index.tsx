import { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import useFetch from '../../hooks/useFetch'
import useInputValue from '../../hooks/useInputValue'

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { setState } = useInputValue(setUser)

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/sign-up'
  })

  const signup = async (e: any) => {
    e.preventDefault()

    fetchData({ ...user })
  }

  return (
    <section className="container">
      <h1 className="container-title">Sign up</h1>

      <div className="content">
        {error && <p>{error}</p>}

        <form className="form" onSubmit={signup}>
          <Input
            placeholder="Name"
            value={user.name}
            name="name"
            onChange={setState}
            maxLength={32}
            autoFocus={true}
          />

          <Input
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={setState}
          />

          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={setState}
            passwordValidation={true}
          />

          <Button>Sign up</Button>
        </form>
      </div>
    </section>
  )
}

export default SignUp