import {AddressModel} from './address.model';

export class UserDetailModel {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  address: AddressModel;
}
