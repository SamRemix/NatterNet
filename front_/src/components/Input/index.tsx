import './styles.scss'

// dependencies
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckBadgeIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'

// types
import { InputProps } from '../../@types/input'

const Input = ({
  type = 'text',
  id,
  placeholder,
  value,
  name,
  onChange,
  maxLength,
  autoFocus = false,
  passwordValidation = false,
  animate
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
    id,
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
        <motion.div className="input-container" {...animate}>
          <label className="input-label" htmlFor={name}>{placeholder}</label>
          <input {...defaultAttribut} />
        </motion.div>
      )}

      {type === 'number' && (
        <motion.div className="input-container" {...animate}>
          <label className="input-label" htmlFor={name}>{placeholder}</label>
          <input type="number" {...defaultAttribut} />
        </motion.div>
      )}

      {type === 'date' && (
        <motion.div className="input-container" {...animate}>
          <label className="input-label" htmlFor={name}>{placeholder}</label>
          <input type="date" {...defaultAttribut} />
        </motion.div>
      )}

      {type === 'password' && (
        <motion.div className="input-container" {...animate}>
          <label className="input-label" htmlFor={name}>{placeholder}</label>
          <div className="input-content">
            <input type={isDisplay ? 'text' : 'password'} {...defaultAttribut} />

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
                    {regex.test(value as string)
                      ? <CheckBadgeIcon width="1.5rem" />
                      : <XMarkIcon width="1.5rem" />}
                    <p>At least {type}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}
    </>
  )
}

export default Input