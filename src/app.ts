import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import accountRoutes from './routes/account.routes';
import transferRoutes from './routes/transfer.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

const openApiSpec = YAML.parse(
  fs.readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8')
);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
app.use('/accounts', accountRoutes);
app.use('/transfers', transferRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
