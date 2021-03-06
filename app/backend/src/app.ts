import * as cors from 'cors';
import * as express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/error';
import router from './routes/routes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(errorMiddleware);
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    // ...
    this.app.listen(PORT, () => {
      console.log(`Listen at port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
