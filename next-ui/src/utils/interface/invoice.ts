import { IProduct } from './product';

export interface IInvoice {
  id?: number;
  product: IProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}
