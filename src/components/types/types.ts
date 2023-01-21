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

export type Winner = {
  id: number;
  time: number;
  wins: number;
};

export type Winners = {
  items: Array<Winner>;
};

export type ViewWinner = {
  id: number;
  color: string;
  name: string;
  wins: number;
  time: number;
};
