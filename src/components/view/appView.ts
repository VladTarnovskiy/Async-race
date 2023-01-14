import Main from './pages/main/main';
import Basket from './pages/basket/basket';
import Error from './pages/error/error';

export class AppView {
  main: Main;
  basket: Basket;
  error: Error;

  constructor() {
    this.main = new Main();
    this.basket = new Basket();
    this.error = new Error();
  }


  drawMain(): void {
    this.main.draw();
  }

  drawBasket(): void {
    this.basket.draw();
  }


  drawError(): void {
    this.error.draw();
  }
}

export default AppView;
