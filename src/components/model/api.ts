import { animation, urlBase } from './store';
import { SpeedData, CarItem } from '../types/types';

export const getCars = async (page: number, limit = 7): Promise<Response> => {
  return await fetch(`${urlBase}/garage?_page=${page}&_limit=${limit}`);
};

export const startCar = async (id: number): Promise<SpeedData> => {
  const response = await fetch(`${urlBase}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });
  return await response.json();
};

export const stopCar = async (id: number): Promise<void> => {
  window.cancelAnimationFrame(animation[id].id);
  await fetch(`${urlBase}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
};

export const getUpdateCar = async (car: { name: string; color: string }, id: number): Promise<void> => {
  await fetch(`${urlBase}/garage/${id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getCarId = async (id: number): Promise<CarItem> => {
  const response = await fetch(`${urlBase}/garage/${id}`);
  const data = await response.json();
  return data;
};

export const createCar = async (car: { name: string; color: string }) => {
  await fetch(`${urlBase}/garage`, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// export const updateCar = async (car: { name: string; color: string }, id: number) => {
//   await fetch(`${urlBase}/garage/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(car),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   await this.drawCars(this.page);
//   this.updateFlag = false;
// };

export const driveCar = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${urlBase}/engine?id=${id}&status=status=drive`, {
    method: 'PATCH',
  });
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

export const removeCar = async (id: number) => {
  await fetch(`${urlBase}/garage/${id}`, {
    method: 'DELETE',
  });
};
