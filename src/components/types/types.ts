export interface CardItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  amount?: number;
  totalPrice?: number;
  inBasket?: boolean;
}

export const enum PageIds {
  GaragePage = '#',
  WinnersPage = '#winners-page',
  ErrorPage = '#erorr-page',
}
