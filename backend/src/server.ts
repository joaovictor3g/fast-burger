import express from 'express';
import { routes } from './routes';
import cors from 'cors';
require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(routes);

if(process.env.NODE_ENV!=='test') {
  app.listen(3333, () => {
    console.log('Running on ', 3333);
  });
}

export { app };