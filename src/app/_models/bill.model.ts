import {ProviderModel} from './provider.model';
import {PaymentModel} from './payment.model';
import {ProductModel} from './product.model';

export class BillModel {
  id: string;
  date: string;
  tax_stamp: number;
  provider: ProviderModel;
  payment: PaymentModel;
  products: ProductModel[];
}
