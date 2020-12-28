import express from 'express';
import bodyParser from 'body-parser';
import routes from './routers';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: '50MB'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true,
  }))
app.use('/', routes);

export default app;
