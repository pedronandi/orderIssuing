import { Product } from './Product';

export interface Data {
  id: number | undefined;
  product: Product| undefined;
  amount: number| undefined;
  unitPrice: number| undefined;
  profitability: string| undefined;
}