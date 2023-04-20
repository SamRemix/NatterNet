import './styles.scss'
import { useContext, useState } from 'react'
import { ToastsContext } from '../../contexts/ToastsContext'
import { ToastProps } from '../../@types/toast'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import toastAnimation from './motion.config'

const Toasts = () => {
  const [toasts, setToasts] = useState([] as ToastProps[])

  const { pushToastRef } = useContext(ToastsContext)

  pushToastRef.current = ({ message, type = 'default' }: ToastProps) => {
    const toast = {
      id: Date.now(),
      message,
      type,
      duration: type === 'error' ? 8 : 6
    }

    setTimeout(() => {
      setToasts(current => (
        current.filter(({ id }) => id !== toast.id)
      ))
    }, toast.duration * 1000)

    setToasts(current => [...current, toast])
  }

  const removeToast = (id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }

  return (
    <div className="toasts-container">
      <AnimatePresence>
        {toasts.map(({ id, message, type, duration }) => (
          <motion.div
            className={`toast ${type}`}
            key={id}
            layoutId={id.toString()}
            {...toastAnimation}>
            {message}

            <XMarkIcon
              className="toast-icon"
              width="1.5rem"
              strokeWidth={1}
              onClick={() => removeToast(id)}
            />

            <div
              className="indicator"
              style={{ animationDuration: `${duration}s` }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Toasts