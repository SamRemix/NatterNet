import './styles.scss'
import { useState } from 'react'
import { CheckBadgeIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'

type InputProps = {
  type?: string,
  placeholder: string,
  name?: string,
  value: string,
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  maxLength?: number,
  autoFocus?: boolean,
  passwordValidation?: boolean
}

const Input = ({
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  maxLength,
  autoFocus = false,
  passwordValidation = false
}: InputProps) => {
  const [isDisplay, setIsDisplay] = useState(false)

  const verifier = [{
    regex: /^.{8,}/,
    type: '8 character'
  }, {
    regex: /[A-Z]/,
    type: '1 uppercase character'
  }, {
    regex: /[a-z]/,
    type: '1 lowercase character'
  }, {
    regex: /\d/,
    type: '1 number'
  }, {
    regex: /[^a-zA-Z\d]/,
    type: '1 special character'
  }]

  const defaultAttribut = {
    className: 'input',
    placeholder,
    value,
    name,
    onChange,
    maxLength,
    autoFocus
  }

  return (
    <>
      {type === 'text' && (
        <div className="input-container">
          <p className="input-label">{placeholder}</p>
          <input {...defaultAttribut} />
        </div>
      )}

      {type === 'password' && (
        <div className="input-container">
          <div className="input-content">
            <input
              {...defaultAttribut}
              type={isDisplay ? 'text' : 'password'}
            />

            <div className="input-content-icon" onClick={() => setIsDisplay(!isDisplay)}>
              {isDisplay
                ? <EyeSlashIcon width="1.5rem" />
                : <EyeIcon width="1.5rem" />}
            </div>
          </div>

          {passwordValidation && (
            <>
              <p>Password must contain :</p>

              <ul className="password-validation">
                {verifier.map(({ regex, type }, k) => (
                  <li className="password-validation-item" key={k}>
                    {regex.test(value)
                      ? <CheckBadgeIcon width="1.5rem" />
                      : <XMarkIcon width="1.5rem" />}
                    <p>At least {type}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Input