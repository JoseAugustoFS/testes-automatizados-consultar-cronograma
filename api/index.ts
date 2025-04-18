import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { routerBasico } from '../src/infra/routes/exemplo_router';
import { factoryConsultarCronograma } from '../src/infra/factories/ConsultarCronogramaFactory';

const app = express();
app.use(express.json());

// Rota básica viva
app.use('/', routerBasico);

// Registrar rota direto aqui
const objeto = factoryConsultarCronograma();
app.get('/cronograma/:disciplinaId', (req, res) => {
  objeto.handle(req, res);
});

// Handler para Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any);
}
