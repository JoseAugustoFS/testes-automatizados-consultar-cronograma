import express from 'express';
import cors from 'cors';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { routerBasico } from '../src/infra/routes/exemplo_router';
import { factoryConsultarCronograma } from '../src/infra/factories/ConsultarCronogramaFactory';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use('/', routerBasico);

const objeto = factoryConsultarCronograma();
app.get('/cronograma/:disciplinaId', (req, res) => {
  objeto.handle(req, res);
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any);
}
