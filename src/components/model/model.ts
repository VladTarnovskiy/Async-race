import AppView from '../view/appView';
import Car from '../view/pages/garage/car/car';
import { CarItem, carsBrand, SpeedData } from '../types/types';

export class Model extends AppView {
  car: Car;
  urlBase = 'http://127.0.0.1:3000';
  page = 1;
  garageTotalCar = 0;
  selectCarId = 0;
  updateFlag = false;
  carsBrand: Array<string>;

  constructor() {
    super();
    this.car = new Car();
    this.carsBrand = carsBrand;
  }

  async getAllCar(page: number, limit = 7): Promise<void> {
    const garage = <HTMLElement>document.querySelector('.garage__cars');
    garage.replaceChildren();
    const response = await fetch(`${this.urlBase}/garage?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    data.forEach((item: CarItem) => {
      this.car.draw(item);
    });
    const count = response.headers.get('X-Total-Count');
    const carTotalCount = <HTMLElement>document.querySelector('.garage__total-count');
    const carPagination = <HTMLElement>document.querySelector('.garage__pagination');
    carTotalCount.textContent = `Garage (${count})`;
    carPagination.textContent = `Page #${page}`;
    this.garageTotalCar = Number(count);
    this.getCarForManage();
  }

  async getCarId(id: number): Promise<CarItem> {
    const response = await fetch(`${this.urlBase}/garage/${id}`);
    const data = await response.json();
    return data;
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
              this.removeCar(carId);
              this.getAllCar(this.page);
              break;
            case 'car__but_drive':
              this.startCar(carId, item);
              break;
            case 'car__but_stop':
              this.stopCar(carId);
              break;
          }
        }
      });
    });
  }

  async createCar(car: { name: string; color: string }) {
    await fetch(`${this.urlBase}/garage`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // this.getAllCar(this.page);
  }

  async updateCar(car: { name: string; color: string }, id: number) {
    await fetch(`${this.urlBase}/garage/${id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await this.getAllCar(this.page);
    this.updateFlag = false;
  }

  async removeCar(id: number) {
    await fetch(`${this.urlBase}/garage/${id}`, {
      method: 'DELETE',
    });
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

    this.createCar(car);
    this.getAllCar(this.page);
  }

  async getDataForUpdateCar(id: number): Promise<void> {
    const choosingCar: CarItem = await this.getCarId(id);
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

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomNum(): number {
    return Math.floor(Math.random() * 7);
  }

  generateCars() {
    for (let i = 1; i <= 100; i++) {
      const car = {
        name: `${this.carsBrand[this.getRandomNum()]}`,
        color: `${this.getRandomColor()}`,
      };
      this.createCar(car);
    }
    setTimeout(() => {
      this.getAllCar(this.page);
    }, 1000);
  }

  async resetCars() {
    const response = await fetch(`${this.urlBase}/garage`);
    const data = await response.json();
    data.forEach((item: CarItem) => {
      this.removeCar(item.id);
    });
    setTimeout(() => {
      this.getAllCar(this.page);
    }, 1000);
  }

  async startCar(id: number, target: HTMLElement) {
    const car = <HTMLElement>target.querySelector('.car__img');
    const response = await fetch(`${this.urlBase}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const data: SpeedData = await response.json();
    let move = 10;
    setInterval(() => {
      car.style.transform = `translateX(${move}px)`;
      move += 10;
    }, Number(data.distance) / Number(data.velocity) / 50);
    // if(car.offsetLeft === '500px'){

    // }
    // console.log(data.velosity);
  }

  async stopCar(id: number) {
    const response = await fetch(`${this.urlBase}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const data = await response.json();
    console.log(data);
  }
}
