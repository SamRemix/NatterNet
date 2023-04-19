import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InstanceProps, useFetchProps } from '../@types/useFetch'

const useFetch = ({ method, url }: useFetchProps) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const instance: InstanceProps = axios.create({ baseURL: 'http://localhost:4000' })

  const fetchData = async (body: object | null = null) => {
    try {
      const { data } = await instance[method](url, body)

      if (url.startsWith('/auth')) {
        localStorage.setItem('token', data.token)

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