import { useState } from 'react'
import axios from 'axios'
import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    message: '',
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

  const signup = async (e: any) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:4000/auth/sign-up', {
        ...user
      })

      // redirect to home page
      // push('/')
    } catch (error: any) {
      console.log(error.response.data)
      setError({ message: error.response.data.message })
    }
  }

  console.log(error)

  return (
    <section className="container">
      <h1 className="container-title">Sign up</h1>

      <h3 className="container-sub-title">Create your account</h3>

      <div className="content">
        {error && <p>{error.message}</p>}
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