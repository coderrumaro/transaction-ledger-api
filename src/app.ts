import express from 'express';
import accountRoutes from './routes/account.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/accounts', accountRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
