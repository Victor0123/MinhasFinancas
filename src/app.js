import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database/index';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({ origin: 'https://minhasfinancas20.herokuapp.com' }));
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
