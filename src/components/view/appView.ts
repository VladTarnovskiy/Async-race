import Garage from './pages/garage/garage';
import Winners from './pages/basket/winners';
import Error from './pages/error/error';

export class AppView {
  garage: Garage;
  winners: Winners;
  error: Error;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
    this.error = new Error();
  }

  drawMain(): void {
    this.garage.draw();
  }

  drawBasket(): void {
    this.winners.draw();
  }

  drawError(): void {
    this.error.draw();
  }
}

export default AppView;
