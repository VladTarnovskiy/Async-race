import AppController from '../controller/controller';

class App {
  controller: AppController;
  constructor() {
    this.controller = new AppController();
  }

  run(): void {
    this.controller.run();
  }
}

export default App;
