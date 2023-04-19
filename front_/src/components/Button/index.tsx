import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { ButtonProps } from '../../@types/button'

const Button = ({ type = 'primary', onClick, children }: ButtonProps) => {
  const navigate = useNavigate()

  const event = type === 'back' ? () => navigate(-1) : onClick

  return (
    <button className={type} onClick={event}>
      {type === 'back'
        ? (
          <>
            <ArrowUturnLeftIcon width="1.5rem" strokeWidth={1.5} />
            <p>Back</p>
          </>
        )
        : children}
    </button>
  )
}

export default Button