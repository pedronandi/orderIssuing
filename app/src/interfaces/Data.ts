import { Product } from './Product';

export interface Data {
  product: Product | undefined;
  amount: number | undefined;
  unitPrice: number | undefined;
  profitability: string | undefined;
}