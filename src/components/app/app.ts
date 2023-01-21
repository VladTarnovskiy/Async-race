// import AppController from '../controller/controller';
import Router from '../router/router';

class App {
  router: Router;
  constructor() {
    this.router = new Router();
  }

  run(): void {
    this.router.run();
  }
}

export default App;
