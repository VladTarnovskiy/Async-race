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
      this.initGaragePage();
    } else if (idPage === PageIds.WinnersPage) {
      this.initWinnersPage();
    } else {
      this.initError();
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

  initGaragePage(): void {
    this.firstWinnerFlag = false;
    this.view.drawMain();
    this.getDataFromStorageGarage();
    this.getRaceCar();
    this.getCreateCar();
    this.garageNextPage(PageIds.GaragePage);
    this.garagePrevPage(PageIds.GaragePage);
    this.drawCars(this.garagePage);
    this.getUpdateCar();
    this.getGenerateCars();
    this.getResetCars();
    this.setDataForStorage();
  }

  initWinnersPage(): void {
    this.view.drawBasket();
    this.getDataFromStorageWinners();
    this.drawWinners(this.winnerPage, this.sortWays, this.sortOrder);
    this.garageNextPage(PageIds.WinnersPage);
    this.garagePrevPage(PageIds.WinnersPage);
    this.sortWinners();
  }

  initError(): void {
    this.view.drawError();
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default Router;
