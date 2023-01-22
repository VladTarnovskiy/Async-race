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

export const driveCar = async (id: number): Promise<number> => {
  const response = await fetch(`${urlBase}/engine?id=${id}&status=drive`, {
    // &status=status=drive`
    method: 'PATCH',
  });
  return response.status;
};

export const removeCar = async (id: number) => {
  await fetch(`${urlBase}/garage/${id}`, {
    method: 'DELETE',
  });
};
