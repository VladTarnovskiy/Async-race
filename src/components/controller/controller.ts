import AppView from '../view/appView';
import { Model } from '../model/model';
import { PageIds } from '../types/types';

class AppController extends Model {
  view: AppView;

  constructor() {
    super();
    this.view = new AppView();
  }

  // start routing
  renderNewPage(idPage: string): void {
    const currentPageHTML = <HTMLElement>document.querySelector('body');
    currentPageHTML.replaceChildren();
    if (idPage === PageIds.GaragePage || idPage === '') {
      this.view.drawMain();
      this.getRaceCar();
      this.getCreateCar();
      this.garageNextPage();
      this.garagePrevPage();
      this.drawCars(this.page);
      this.getUpdateCar();
      this.getGenerateCars();
      this.getResetCars();
    } else if (idPage === PageIds.WinnersPage) {
      this.view.drawBasket();
    } else {
      this.view.drawError();
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.split('?')[0];
      this.renderNewPage(hash);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.split('?')[0];
      this.renderNewPage(hash);
    });
  }
  //endrouting

  private getRaceCar(): void {
    const raceButton = <HTMLElement>document.querySelector('.button_race');
    raceButton.addEventListener('click', () => {
      this.raceCar();
    });
  }

  private getCreateCar(): void {
    const brandName = <HTMLInputElement>document.querySelector('.brand__display_create');
    const colorName = <HTMLInputElement>document.querySelector('.color__input_create');
    const createButton = <HTMLElement>document.querySelector('.color__button_create');
    createButton.addEventListener('click', () => {
      if (brandName.checkValidity()) {
        this.getDataForCreateCar();
      }
    });
    colorName.addEventListener('input', () => {
      brandName.style.border = `3px ${colorName.value} solid`;
    });
  }

  private garagePrevPage(): void {
    const butPrevPage = <HTMLElement>document.querySelector('.page__but_prev');
    butPrevPage.addEventListener('click', () => {
      if (this.page > 1) {
        this.page -= 1;
        this.drawCars(this.page);
      }
    });
  }

  private garageNextPage(): void {
    const butNextPage = <HTMLElement>document.querySelector('.page__but_next');
    butNextPage.addEventListener('click', () => {
      if (Math.ceil(this.garageTotalCar / 7 / this.page) > 1) {
        this.page += 1;
        this.drawCars(this.page);
      }
    });
  }

  private getUpdateCar(): void {
    const butUpdate = <HTMLElement>document.querySelector('.color__button_update');
    const brandName = <HTMLInputElement>document.querySelector('.brand__display_update');
    const colorName = <HTMLInputElement>document.querySelector('.color__input_update');

    butUpdate.addEventListener('click', () => {
      if (this.updateFlag === true && brandName.checkValidity()) {
        const car = {
          name: `${brandName.value}`,
          color: `${colorName.value}`,
        };
        this.updateCar(car, this.selectCarId);
      }
    });

    colorName.addEventListener('input', () => {
      brandName.style.border = `3px ${colorName.value} solid`;
    });
  }

  private getGenerateCars(): void {
    const butGenerate = <HTMLElement>document.querySelector('.button_generate');
    butGenerate.addEventListener('click', () => {
      this.generateCars();
    });
  }

  private getResetCars(): void {
    const butReset = <HTMLElement>document.querySelector('.button_reset');
    butReset.addEventListener('click', () => {
      this.stopDriveAll();
    });
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default AppController;
