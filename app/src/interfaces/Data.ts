import { Product } from '../interfaces/Product';

export interface Data {
  products: Product[];
  amount: number | undefined;
  unitPrice: number | undefined;
  profitability: string;
}