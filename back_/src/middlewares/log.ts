import { Request, Response, NextFunction } from 'express'

// print date path, method & time in the console at each request
export const log = ({ method, path, body, userId }: Request | any, _res: Response, next: NextFunction) => {
  const items = {
    method,
    path,
    body: method === 'POST' && body,
    isConnected: userId ? true : false,
    executedAt: new Date().toLocaleTimeString()
  }

  console.log('@REQUEST', items)

  next()
}