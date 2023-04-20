import axios from 'axios'
import { useEffect } from 'react'
import Container from '../../components/Container'

const Home = () => {
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/posts')

        console.log('@POSTS', data)
      } catch ({ response }: any) {
        console.error(response.data.message)
      }
    }

    getPosts()
  }, [])

  return (
    <Container title="Home" />
  )
}

export default Home