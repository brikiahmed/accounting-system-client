import {ProviderModel} from './provider.model';
import {PaymentModel} from './payment.model';
import {ProductModel} from './product.model';

export class BillModel {
  id: string;
  date: string;
  deadline: string;
  tax_stamp: number;
  provision: boolean;
  provider: ProviderModel;
  payment: PaymentModel;
  products: ProductModel[];
}
