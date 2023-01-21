import AppView from '../view/appView';
import { Model } from '../model/model';
import { PageIds } from '../types/types';
import selectors from '../model/selectors';

class AppController extends Model {
  view: AppView;

  constructor() {
    super();
    this.view = new AppView();
  }

  // start routing
  renderNewPage(idPage: string): void {
    selectors.body().replaceChildren();
    if (idPage === PageIds.GaragePage || idPage === '') {
      this.firstWinnerFlag = false;
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
      this.drawWinners(this.page);
      this.winnersNextPage();
      this.winnersPrevPage();
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

  private getCreateCar(): void {
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

  private garagePrevPage(): void {
    selectors.getPrevBtn().addEventListener('click', () => {
      if (this.page > 1) {
        this.page -= 1;
        this.drawCars(this.page);
      }
    });
  }

  private garageNextPage(): void {
    selectors.getNextBtn().addEventListener('click', () => {
      if (Math.ceil(this.garageTotalCar / 7 / this.page) > 1) {
        this.page += 1;
        this.drawCars(this.page);
      }
    });
  }

  private getUpdateCar(): void {
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

  private getGenerateCars(): void {
    selectors.getGenerateBtn().addEventListener('click', () => {
      this.generateCars();
    });
  }

  private getResetCars(): void {
    selectors.getResetBtn().addEventListener('click', () => {
      selectors.getRaceBtn().classList.remove('but-disabled');
      selectors.getResetBtn().classList.remove('but-active');
      this.stopDriveAll();
    });
  }

  private winnersPrevPage(): void {
    selectors.getPrevBtn().addEventListener('click', () => {
      if (this.winnerPage > 1) {
        this.winnerPage -= 1;
        this.drawWinners(this.winnerPage);
      }
    });
  }

  private winnersNextPage(): void {
    selectors.getNextBtn().addEventListener('click', () => {
      if (Math.ceil(this.winnersTotalCar / 7 / this.winnerPage) > 1) {
        this.winnerPage += 1;
        this.drawWinners(this.winnerPage);
      }
    });
  }

  run(): void {
    this.enableRouteChange();
    this.renderNewPage('#?');
  }
}

export default AppController;
