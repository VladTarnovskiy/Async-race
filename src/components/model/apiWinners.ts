import { urlBase } from './store';
import { Winner, WinnerUpdate } from '../types/types';

export const getWinner = async (id: number): Promise<Winner> => {
  const response = await fetch(`${urlBase}/winners/${id}`);
  const winner = await response.json();
  return winner;
};

export const getWinners = async (
  page: number,
  sort?: string | null,
  order?: string | null,
  limit = 7
): Promise<Response> => {
  return await fetch(`${urlBase}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  // &_sort=${limit}&_order=${limit}
};

export const getWinnerStatus = async (id: number): Promise<number> => {
  const response = await fetch(`${urlBase}/winners/${id}`);
  const status = await response.status;
  return status;
};

export const createWinner = async (body: Winner): Promise<void> => {
  await fetch(`${urlBase}/winners`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${urlBase}/winners/${id}`, { method: 'DELETE' });
};

export const updateWinner = async (id: number, body: WinnerUpdate): Promise<void> => {
  await fetch(`${urlBase}/winners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
