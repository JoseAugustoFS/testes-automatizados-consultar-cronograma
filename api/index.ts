import express from 'express'
import serverless from 'serverless-http'
import { routerBasico } from '../src/infra/routes/exemplo_router'

const app = express()

app.use(express.json())
app.use(routerBasico)

export const handler = serverless(app)
