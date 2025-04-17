import express, { Request, Response } from 'express'
import { routerBasico } from '../src/infra/routes/exemplo_router'
import { VercelRequest, VercelResponse } from '@vercel/node'

const app = express()
app.use(express.json())
app.use('/', routerBasico)

export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as unknown as Request, res as unknown as Response)
}
