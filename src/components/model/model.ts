import AppView from '../view/appView';
import Car from '../view/pages/garage/car/car';
import CarWinner from '../view/pages/basket/car-winner/car-winner';
import { CarItem, SpeedData, ViewWinner, Winner, WinnerUpdate, WinnersSort } from '../types/types';
import { animation } from './store';
import { getCars, startCar, stopCar, createCar, getCarId, removeCar, driveCar, getUpdateCar } from './apiCars';
import { createWinner, deleteWinner, getWinner, getWinnerStatus, getWinners, updateWinner } from './apiWinners';
import selectors from '../model/selectors';
import { getRandomColor, getRandomNum, carsBrand } from './helpers';
import { urlBase } from './store';

export class Model extends AppView {
  car: Car;
  carWinner: CarWinner;
  page = 1;
  winnerPage = 1;
  garageTotalCar = 0;
  winnersTotalCar = 0;
  selectCarId = 0;
  updateFlag = false;
  firstWinnerFlag = false;
  oreder = '';
  sortWays = '';
  sortItem = false;

  constructor() {
    super();
    this.car = new Car();
    this.carWinner = new CarWinner();
  }

  async drawCars(page: number): Promise<void> {
    selectors.getGarage().replaceChildren();
    const carsData = await getCars(page);
    const data: Array<CarItem> = await carsData.json();
    data.forEach((item: CarItem) => {
      this.car.draw(item);
    });
    const count = carsData.headers.get('X-Total-Count');
    selectors.getGarageTotalCount().textContent = `Garage (${count})`;
    selectors.getGaragePagination().textContent = `Page #${page}`;
    this.garageTotalCar = Number(count);
    this.getCarForManage();
  }

  async raceCar(): Promise<void> {
    const car = selectors.getQuerySelectorAll('.car');
    car.forEach((item) => {
      this.startDrive(Number(item.dataset.id), item);
    });
  }

  private getCarForManage(): void {
    const car = selectors.getQuerySelectorAll('.car');
    car.forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = <HTMLElement>e.target;
        const carId = Number(item.dataset.id);
        if (target.classList[2]) {
          const className = target.classList[2];
          switch (className) {
            case 'car__but_select':
              this.getDataForUpdateCar(carId);
              break;
            case 'car__but_remove':
              removeCar(carId);
              this.drawCars(this.page);
              break;
            case 'car__but_drive':
              this.startDrive(carId, item);
              break;
            case 'car__but_stop':
              stopCar(carId);
              this.stopDriveOneCar(carId, item);
              break;
          }
        }
      });
    });
  }

  async updateCar(car: { name: string; color: string }, id: number) {
    await getUpdateCar(car, id);
    await this.drawCars(this.page);
    this.updateFlag = false;
  }

  getDataForCreateCar(): void {
    const brandCar = selectors.getBrandName().value;
    const colorCar = selectors.getColorName().value;

    const car = {
      name: `${brandCar}`,
      color: `${colorCar}`,
    };

    createCar(car);
    this.drawCars(this.page);
  }

  async getDataForUpdateCar(id: number): Promise<void> {
    const choosingCar: CarItem = await getCarId(id);
    const brandName = selectors.getBrandNameUpdate();
    const colorName = selectors.getColorNameUpdate();
    const butsSelect = selectors.getQuerySelectorAll('.car__but_select');
    brandName.value = choosingCar.name;
    brandName.style.border = `3px ${choosingCar.color} solid`;
    colorName.value = choosingCar.color;
    this.selectCarId = id;
    this.updateFlag = true;

    butsSelect.forEach((item) => {
      item.classList.remove('active');
    });

    butsSelect.forEach((item) => {
      if (Number(item.dataset.id) === id) item.classList.add('active');
    });
  }

  generateCars() {
    for (let i = 1; i <= 100; i++) {
      const car = {
        name: `${carsBrand[getRandomNum()]}`,
        color: `${getRandomColor()}`,
      };
      createCar(car);
    }
    setTimeout(() => {
      this.drawCars(this.page);
    }, 1000);
  }

  async startDrive(id: number, target: HTMLElement): Promise<void> {
    const butStart = selectors.getTargetQuerySelector(target, '.car__but_drive');
    const butStop = selectors.getTargetQuerySelector(target, '.car__but_stop');

    if (!butStart.classList.contains('but-active') && !butStart.classList.contains('but-disabled')) {
      const car = selectors.getTargetQuerySelector(target, '.car__img');
      const road = selectors.getTargetQuerySelector(target, '.car__road');
      const winMessage = selectors.getWinMessage();
      const { velocity, distance }: SpeedData = await startCar(id);
      const winCar = await getCarId(id);
      const timex = Math.floor(Number(distance) / Number(velocity) / 10);
      const roadWidth = road.clientWidth;
      const speed = roadWidth / timex;
      const success: { success: boolean } = await driveCar(id);
      let done = false;
      let step = 0;
      const state: {
        id: number;
      } = { id: 1 };
      butStart.classList.add('but-active');
      butStop.classList.remove('but-disabled');
      car.style.left = `0px`;

      const timeNow = new Date().getTime();

      const move = () => {
        const carCoord = window.getComputedStyle(car);
        const matrix = new WebKitCSSMatrix(carCoord.transform);
        if (success.success === false || Math.ceil(matrix.m41) >= roadWidth - 130) {
          if (this.firstWinnerFlag === false) {
            const timeThen = new Date().getTime();
            const timer = (timeThen - timeNow) / 1000;
            winMessage.style.display = 'block';
            winMessage.textContent = `${winCar.name} won first (${timer}s)`;
            setTimeout(() => {
              winMessage.style.display = 'none';
            }, 3000);
            this.firstWinnerFlag = true;
            const winner = {
              id: id,
              time: timer,
              wins: 1,
            };
            this.recordWinners(winner);
          }

          window.cancelAnimationFrame(animation[id].id);
          done = true;

          butStart.classList.add('but-disabled');
          butStart.classList.remove('but-active');
          butStop.classList.remove('but-disabled');
        }
        step += speed;
        car.style.transform = `translateX(${step}px)`;
        if (done === false) {
          state.id = window.requestAnimationFrame(move);
        }
      };

      state.id = window.requestAnimationFrame(move);
      animation[id] = state;
    }
  }

  async stopDriveAll(): Promise<void> {
    const carsData = await getCars(this.page);
    const data: Array<CarItem> = await carsData.json();
    const car = selectors.getQuerySelectorAll('.car__img');
    const butsStart = selectors.getQuerySelectorAll('.car__but_drive');
    const butsStop = selectors.getQuerySelectorAll('.car__but_stop');
    this.firstWinnerFlag = false;

    butsStart.forEach((item) => {
      item.classList.remove('but-active');
      item.classList.remove('but-disabled');
    });

    butsStop.forEach((item) => {
      item.classList.add('but-disabled');
      item.classList.remove('but-active');
    });

    data.forEach((item: CarItem) => {
      stopCar(item.id);

      window.cancelAnimationFrame(animation[item.id].id);
    });

    car.forEach((item) => {
      item.style.transform = 'translateX(0px)';
    });
  }

  async stopDriveOneCar(id: number, target: HTMLElement): Promise<void> {
    const car = selectors.getTargetQuerySelector(target, '.car__img');
    const butStart = selectors.getTargetQuerySelector(target, '.car__but_drive');
    const butStop = selectors.getTargetQuerySelector(target, '.car__but_stop');
    window.cancelAnimationFrame(animation[id].id);
    stopCar(id);
    butStart.classList.remove('but-disabled');
    butStart.classList.remove('but-active');
    butStop.classList.add('but-disabled');
    car.style.transform = 'translateX(0px)';
  }

  //WINNERS
  async drawWinners(page: number, sort?: string, order?: string): Promise<void> {
    selectors.getWinners().replaceChildren();
    let number = 1;
    const response = await getWinners(this.winnerPage, sort, order);
    const dataWinners = await response.json();
    const count = await response.headers.get('X-Total-Count');
    this.winnersTotalCar = Number(count);
    dataWinners.forEach(async (item: Winner) => {
      const car = await getCarId(item.id);
      const data = {
        id: number,
        color: car.color,
        name: car.name,
        wins: item.wins,
        time: item.time,
      };
      this.carWinner.draw(data);
      number += 1;
    });
    selectors.getWinnersTotalCount().textContent = `Garage (${this.winnersTotalCar})`;
    selectors.getWinnersPagination().textContent = `Page #${page}`;
  }

  async recordWinners(dataWin: Winner): Promise<void> {
    const response = await fetch(`${urlBase}/winners`);
    const winners = await response.json();
    winners.forEach((item: Winner) => {
      if (item.id === dataWin.id) {
        const data = {
          time: dataWin.time < item.time ? dataWin.time : item.time,
          wins: item.wins + 1,
        };
        updateWinner(dataWin.id, data);
        return;
      }
    });
    createWinner(dataWin);
  }

  getSortWinners(target: HTMLElement): void {
    if (target.classList.contains('table__header-item')) {
      const className = target.classList[1];
      switch (className) {
        case WinnersSort.id:
          this.drawWinners(this.winnerPage, 'id', this.getSortParams(target, 'id'));
          break;
        case WinnersSort.wins:
          this.drawWinners(this.winnerPage, 'wins', this.getSortParams(target, 'wins'));
          break;
        case WinnersSort.time:
          this.drawWinners(this.winnerPage, 'time', this.getSortParams(target, 'time'));
          break;
      }
    }
  }

  getSortParams(target: HTMLElement, sort: string): string {
    const sortElem = selectors.getQuerySelectorAll('.table__header-item');
    let sortId = '';
    sortElem.forEach((item) => {
      item.classList.remove('increase');
      item.classList.remove('decrease');
    });
    if (this.sortWays === '') {
      this.sortWays = sort;
    }
    if (sort === this.sortWays) {
      if (this.sortItem === false) {
        this.sortItem = true;
        target.classList.add('increase');
        target.classList.remove('decrease');
        sortId = 'ASC';
      } else {
        this.sortItem = false;
        target.classList.remove('increase');
        target.classList.add('decrease');
        sortId = 'DESC';
      }
    } else {
      this.sortItem = true;
      this.sortWays = sort;
      target.classList.add('increase');
      target.classList.remove('decrease');
      sortId = 'ASC';
    }
    return sortId;
  }
}
