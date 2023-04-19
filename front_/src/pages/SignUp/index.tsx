import { useState } from 'react'
import axios from 'axios'
import Input from '../../components/Input'
import Button from '../../components/Button'
import useFetch from '../../hooks/useFetch'

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  type TargetProps = {
    target: {
      name: string,
      value: string
    }
  }

  const setState = ({ target: { name, value } }: TargetProps) => {
    setUser(current => ({ ...current, [name]: value }))
  }

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/sign-up'
  })

  const signup = async (e: any) => {
    e.preventDefault()

    fetchData({ ...user })
  }

  console.log(error)

  return (
    <section className="container">
      <h1 className="container-title">Sign up</h1>

      <h3 className="container-sub-title">Create your account</h3>

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