import { useCallback, useContext } from 'react'
import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { pushToastRef } = useContext(ToastsContext)

  const addToast = useCallback(
    (toast: any) => {
      pushToastRef.current(toast)
    }, [pushToastRef]
  )

  return { addToast }
}

export default useToasts