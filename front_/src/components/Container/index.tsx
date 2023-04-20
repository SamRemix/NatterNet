import './styles.scss'

// dependencies
import { motion } from 'framer-motion'

// motion
import titleAnimation from './motion.config'

type ContainerProps = {
  title: string,
  children?: React.ReactNode
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <section className="container">
      <motion.h1 className="container-title" {...titleAnimation}>{title}</motion.h1>

      <div className="content">
        {children}
      </div>
    </section>
  )
}

export default Container