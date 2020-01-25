import {UserDetailModel} from './user-detail.model';
import {OrderModel} from './order.model';

export class UserModel {
  id: string;
  email: string;
  user_detail: UserDetailModel;
  orders: OrderModel[];
}
