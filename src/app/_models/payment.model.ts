import {BillModel} from './bill.model';

export class PaymentModel {
  id: string;
  date: string;
  check_number?: string;
  bill_id: string;
  bill?: BillModel;
}
