import AppController from '../controller/controller';
import AppView from '../view/appView';
import { PageIds } from '../types/types';
import selectors from '../model/selectors';

class Router extends AppController {
  view: AppView;

  constructor() {
    super();
    this.view = new AppView();
  }

  renderNewPage(idPage: string): void {
    selectors.body().replaceChildren();
    if (idPage === PageIds.GaragePage || idPage === '') {
      this.firstWinnerFlag = false;
      this.view.drawMain();
      this.getRaceCar();
      this.getCreateCar();
      this.garageNextPage(PageIds.GaragePage);
      this.garagePrevPage(PageIds.GaragePage);
      this.drawCars(this.page);
      this.getUpdateCar();
      this.getGenerateCars();
      this.getResetCars();
    } else if (idPage === PageIds.WinnersPage) {
      this.view.drawBasket();
      this.drawWinners(this.winnerPage);
      this.garageNextPage(PageIds.WinnersPage);
      this.garagePrevPage(PageIds.WinnersPage);
      this.sortWinners();
    } else {
      this.view.drawError();
    }
  }

  enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.split('?')[0];
      this.renderNewPage(hash);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.split('?')[0];
      this.renderNewPage(hash);
    });
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default Router;
