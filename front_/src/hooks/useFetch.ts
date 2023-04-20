import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'
import useToasts from './useToasts'

import { InstanceProps, useFetchProps } from '../@types/useFetch'
import { AuthContextProps } from '../@types/authContext'

const useFetch = ({ method, url }: useFetchProps) => {
  const [response, setResponse] = useState(null)

  const navigate = useNavigate()

  const { addToast } = useToasts()

  const { register } = useContext(AuthContext) as AuthContextProps

  const instance: InstanceProps = axios.create({ baseURL: 'http://localhost:4000' })

  const fetchData = async (body: object | null = null) => {
    try {
      const { data } = await instance[method](url, body)

      if (url.startsWith('/auth')) {
        register(data.token)

        switch (url.split('/')[2]) {
          case 'sign-up':
            addToast({ message: 'Successfully registered 🔥' })
            break

          case 'log-in':
            addToast({ message: `Hi ${data.user.name}, welcome back! 🤘` })
            break

          default:
            break
        }

        navigate('/')
      }

      setResponse(data)
    } catch (error: any) {
      console.log(error.response.data)
      addToast({ message: error.response.data.message, type: 'error' })
    }
  }

  useEffect(() => {
    if (method === 'GET') {
      fetchData()
    }
  }, [method, url])

  return { response, fetchData }
}

export default useFetch