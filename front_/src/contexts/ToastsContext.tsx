import { createContext, useRef } from 'react'
import { ChildrenProps } from '../@types/children'
import { ToastProps } from '../@types/toast'

const push = (toast: ToastProps) => { }

const initialState = {
  pushToastRef: {
    current: push
  }
}

export const ToastsContext = createContext(initialState)

const ToastsProvider = ({ children }: ChildrenProps) => {
  const pushToastRef = useRef(push)

  return (
    <ToastsContext.Provider value={{ pushToastRef }}>
      {children}
    </ToastsContext.Provider>
  )
}

export default ToastsProvider