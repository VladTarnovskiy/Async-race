import { Model } from '../model/model';
import { PageIds } from '../types/types';
import selectors from '../model/selectors';

class AppController extends Model {
  constructor() {
    super();
  }

  getRaceCar(): void {
    const raceButton = selectors.getRaceBtn();
    const resetButton = selectors.getResetBtn();
    selectors.getRaceBtn().addEventListener('click', () => {
      if (!raceButton.classList.contains('but-disabled')) {
        raceButton.classList.add('but-disabled');
        resetButton.classList.add('but-active');
        this.raceCar();
      }
    });
  }

  getCreateCar(): void {
    const brandName = selectors.getBrandName();
    const colorName = selectors.getColorName();
    const createButton = selectors.getCreateBtn();
    createButton.addEventListener('click', () => {
      this.getDataForCreateCar();
    });
    colorName.addEventListener('input', () => {
      brandName.style.border = `3px ${colorName.value} solid`;
    });
  }

  garagePrevPage(page: string): void {
    selectors.getPrevBtn().addEventListener('click', () => {
      switch (page) {
        case PageIds.GaragePage:
          if (this.page > 1) {
            this.page -= 1;
            this.drawCars(this.page);
          }
          break;
        case PageIds.WinnersPage:
          if (this.winnerPage > 1) {
            this.winnerPage -= 1;
            this.drawWinners(this.winnerPage);
          }
          break;
      }
    });
  }

  garageNextPage(page: string): void {
    selectors.getNextBtn().addEventListener('click', () => {
      switch (page) {
        case PageIds.GaragePage:
          if (Math.ceil(this.garageTotalCar / 7 / this.page) > 1) {
            this.page += 1;
            this.drawCars(this.page);
          }
          break;
        case PageIds.WinnersPage:
          if (Math.ceil(this.winnersTotalCar / 7 / this.winnerPage) > 1) {
            this.winnerPage += 1;
            this.drawWinners(this.winnerPage);
          }
          break;
      }
    });
  }

  getUpdateCar(): void {
    const brandName = selectors.getBrandNameUpdate();
    const colorName = selectors.getColorNameUpdate();
    selectors.getUpdateBtn().addEventListener('click', () => {
      if (this.updateFlag === true) {
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

  getGenerateCars(): void {
    selectors.getGenerateBtn().addEventListener('click', () => {
      this.generateCars();
    });
  }

  getResetCars(): void {
    selectors.getResetBtn().addEventListener('click', () => {
      selectors.getRaceBtn().classList.remove('but-disabled');
      selectors.getResetBtn().classList.remove('but-active');
      this.stopDriveAll();
    });
  }

  sortWinners(): void {
    selectors.getQuerySelector('.table__header').addEventListener('click', (event) => {
      const target = <HTMLElement>event.target;
      this.getSortWinners(target);
    });
  }
}

export default AppController;
