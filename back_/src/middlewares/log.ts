import { Request, Response, NextFunction } from 'express'

// print date path, method & time in the console at each request
export const log = ({ method, originalUrl, body }: Request, _res: Response, next: NextFunction) => {
  const items = {
    method,
    path: originalUrl,
    body: (method === 'POST' || method === 'PUT') && body,
    executedAt: new Date().toLocaleTimeString()
  }

  console.log('\n@REQUEST', items)

  next()
}