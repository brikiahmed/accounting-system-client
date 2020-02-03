import {ProviderModel} from './provider.model';

export class BillModel {
  id: string;
  date: string;
  tax_stamp: string;
  provider: ProviderModel;
}
