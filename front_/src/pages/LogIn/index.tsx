import { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import useFetch from '../../hooks/useFetch'
import { TargetProps } from '../../@types/target'

const SignUp = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const setState = ({ target: { name, value } }: TargetProps) => {
    setUser(current => ({ ...current, [name]: value }))
  }

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/log-in'
  })

  const logIn = async (e: any) => {
    e.preventDefault()

    fetchData({ ...user })
  }

  return (
    <section className="container">
      <h1 className="container-title">Log in</h1>

      <div className="content">
        {error && <p>{error}</p>}

        <form className="form" onSubmit={logIn}>

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

          <Button>Log in</Button>
        </form>
      </div>
    </section>
  )
}

export default SignUp