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
