import AppView from '../view/appView';
import Car from '../view/pages/garage/car/car';
import { CarItem, SpeedData } from '../types/types';
import { animation, urlBase } from './store';
import { getCars, startCar, stopCar, createCar, getCarId, removeCar, driveCar, getUpdateCar } from './api';
import { getRandomColor, getRandomNum, carsBrand } from './helpers';

export class Model extends AppView {
  car: Car;
  page = 1;
  garageTotalCar = 0;
  selectCarId = 0;
  updateFlag = false;

  constructor() {
    super();
    this.car = new Car();
  }

  async drawCars(page: number): Promise<void> {
    const garage = <HTMLElement>document.querySelector('.garage__cars');
    garage.replaceChildren();
    const carsData = await getCars(page);
    const data: Array<CarItem> = await carsData.json();
    data.forEach((item: CarItem) => {
      this.car.draw(item);
    });
    const count = carsData.headers.get('X-Total-Count');
    const carTotalCount = <HTMLElement>document.querySelector('.garage__total-count');
    const carPagination = <HTMLElement>document.querySelector('.garage__pagination');
    carTotalCount.textContent = `Garage (${count})`;
    carPagination.textContent = `Page #${page}`;
    this.garageTotalCar = Number(count);
    this.getCarForManage();
  }

  async raceCar(): Promise<void> {
    const car = document.querySelectorAll<HTMLElement>('.car');
    car.forEach((item) => {
      this.startDrive(Number(item.dataset.id), item);
    });
  }

  private getCarForManage(): void {
    const car = document.querySelectorAll<HTMLElement>('.car');
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
    const brandName = <HTMLInputElement>document.querySelector('.brand__display_create');
    const colorName = <HTMLInputElement>document.querySelector('.color__input_create');
    const brandCar = brandName.value;
    const colorCar = colorName.value;

    const car = {
      name: `${brandCar}`,
      color: `${colorCar}`,
    };

    createCar(car);
    this.drawCars(this.page);
  }

  async getDataForUpdateCar(id: number): Promise<void> {
    const choosingCar: CarItem = await getCarId(id);
    const brandName = <HTMLInputElement>document.querySelector('.brand__display_update');
    const colorName = <HTMLInputElement>document.querySelector('.color__input_update');
    const butsSelect = document.querySelectorAll<HTMLElement>('.car__but_select');
    brandName.value = choosingCar.name;
    brandName.style.border = `3px ${choosingCar.color} solid`;
    colorName.value = choosingCar.color;
    this.selectCarId = id;
    this.updateFlag = true;

    butsSelect.forEach((item) => {
      item.classList.remove('active');
    });

    butsSelect.forEach((item, index) => {
      if (index + 1 === id) item.classList.add('active');
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
    const car = <HTMLElement>target.querySelector('.car__img');
    const road = <HTMLElement>target.querySelector('.car__road');
    const { velocity, distance }: SpeedData = await startCar(id);
    const timex = Math.floor(Number(distance) / Number(velocity) / 1300);
    const roadWidth = road.clientWidth;
    const success: { success: boolean } = await driveCar(id);
    const state: {
      id: number;
    } = { id: 1 };
    let done = false;
    let step = 0;
    car.style.left = `0px`;

    const move = () => {
      const carCoord = window.getComputedStyle(car);
      const matrix = new WebKitCSSMatrix(carCoord.transform);
      if (success.success === false || Math.ceil(matrix.m41) >= roadWidth - 130) {
        window.cancelAnimationFrame(animation[id].id);
        car.style.left = `${roadWidth - 100}px`;
        step = 0;
        done = true;
      }
      step += timex;
      car.style.transform = `translateX(${step}px)`;
      if (done === false) {
        state.id = window.requestAnimationFrame(move);
      }
    };

    state.id = window.requestAnimationFrame(move);
    animation[id] = state;
  }

  async stopDriveAll(): Promise<void> {
    const carsData = await getCars(this.page);
    const data: Array<CarItem> = await carsData.json();
    data.forEach((item: CarItem) => {
      // startCar(item.id);
      window.cancelAnimationFrame(animation[item.id].id);
      stopCar(item.id);
    });

    const car = document.querySelectorAll<HTMLElement>('.car__img');
    car.forEach((item) => {
      item.style.transform = 'translateX(0px)';
      item.style.left = `0px`;
    });
  }

  async stopDriveOneCar(id: number, target: HTMLElement): Promise<void> {
    window.cancelAnimationFrame(animation[id].id);
    stopCar(id);
    const car = <HTMLElement>target.querySelector('.car__img');

    car.style.transform = 'translateX(0px)';
    car.style.left = `0px`;
  }
}
