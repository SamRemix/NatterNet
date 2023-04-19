import { TargetProps } from '../@types/target'

const useInputValue = (dispatch: React.SetStateAction<any>) => {
  const setState = ({ target: { name, value } }: TargetProps) => {
    dispatch((current: any) => ({
      ...current,
      [name]: value
    }))
  }

  return { setState }
}

export default useInputValue