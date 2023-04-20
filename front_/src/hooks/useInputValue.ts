import { InputTargetProps } from '../@types/input'

const useInputValue = (dispatch: React.SetStateAction<any>) => {
  const setState = ({ target }: InputTargetProps) => {
    const { name, value } = target

    dispatch((current: any) => ({
      ...current,
      [name]: value
    }))
  }

  return { setState }
}

export default useInputValue