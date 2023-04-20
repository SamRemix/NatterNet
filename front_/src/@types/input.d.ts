export type InputProps = {
  type?: string,
  placeholder: string,
  name?: string,
  value: string,
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
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