export type InputProps = {
  type?: string,
  id?: string,
  placeholder: string,
  name?: string,
  value: any,
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  range?: {
    min?: number,
    max?: number,
    step?: number
  },
  maxLength?: number,
  autoFocus?: boolean,
  passwordValidation?: boolean,
  animate?: object
}

export type InputTargetProps = {
  target: {
    name: string,
    value: string
  }
}