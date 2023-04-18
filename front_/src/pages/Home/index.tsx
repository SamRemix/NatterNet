import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/post')

        console.log('@POSTS', data)
      } catch ({ response }: any) {
        console.error(response.data.message)
      }
    }

    getPosts()
  }, [])

  return (
    <section className="container">
      <h1 className="container-title">Home</h1>
    </section>
  )
}

export default Home