import './styles.scss'

// dependencies
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

// types
import { ButtonProps } from '../../@types/button'

const Button = ({ type = 'primary', onClick, children, animate }: ButtonProps) => {
  const navigate = useNavigate()

  const event = type === 'back' ? () => navigate(-1) : onClick

  return (
    <motion.button className={type} onClick={event} {...animate}>
      {type === 'back'
        ? (
          <>
            <ArrowUturnLeftIcon width="1.5rem" strokeWidth={1.5} />
            <p>Back</p>
          </>
        )
        : children}
    </motion.button>
  )
}

export default Button