import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
