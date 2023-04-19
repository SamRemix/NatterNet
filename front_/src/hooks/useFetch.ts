import axios, { AxiosInstance } from 'axios'
import { useEffect, useState } from 'react'

type useFetchProps = {
  method: string,
  url: string
}

const useFetch = ({ method, url }: useFetchProps) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  type InstanceProps = {
    [key: string]: any
  }

  const instance: InstanceProps = axios.create({ baseURL: 'http://localhost:4000' })

  const fetchData = async (body: object | null = null) => {
    try {
      const { data } = await instance[method](url, body)

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