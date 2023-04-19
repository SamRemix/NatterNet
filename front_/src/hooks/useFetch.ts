import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InstanceProps, useFetchProps } from '../@types/useFetch'
import { AuthContext } from '../contexts/AuthContext'
import { AuthContextProps } from '../@types/authContext'

const useFetch = ({ method, url }: useFetchProps) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { register } = useContext(AuthContext) as AuthContextProps

  const instance: InstanceProps = axios.create({ baseURL: 'http://localhost:4000' })

  const fetchData = async (body: object | null = null) => {
    try {
      const { data } = await instance[method](url, body)

      if (url.startsWith('/auth')) {
        register(data.token)

        navigate('/')
      }

      setResponse(data)
    } catch (error: any) {
      console.log(error.response.data)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    if (method === 'GET') {
      fetchData()
    }
  }, [method, url])

  return { response, error, fetchData }
}

export default useFetch