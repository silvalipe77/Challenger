import express, { Request, Response, NextFunction, json } from 'express'

const app = express()

app.use(json())

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
})

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
})
export default app
