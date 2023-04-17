import { Request, Response, NextFunction } from 'express'

// print date path, method & time in the console at each request
const logRequest = ({ method, path }: Request, _res: Response, next: NextFunction) => {
  const time = new Date().toLocaleTimeString()

  console.log(`\n@REQUEST: ${method} => ${path} at ${time}`)

  next()
}

export default logRequest