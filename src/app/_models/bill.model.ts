import {ProviderModel} from './provider.model';
import {PaymentModel} from './payment.model';

export class BillModel {
  id: string;
  date: string;
  tax_stamp: string;
  provider: ProviderModel;
  payment: PaymentModel;
}
