export interface CarItem {
  name: string;
  color: string;
  id: number;
}

export interface SpeedData {
  velocity: string;
  distance: string;
}

export const enum PageIds {
  GaragePage = '#',
  WinnersPage = '#winners-page',
  ErrorPage = '#erorr-page',
}

export const carsBrand: Array<string> = [
  'Jaguar',
  'Aston Martin',
  'Alpine',
  'Bentley',
  'Cadillac',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Datsun',
  'Dodge',
  'Ford',
  'Mersedes',
  'Audi',
  'Ferrari',
  'Feat',
];
