import {PromoCodeModel} from './promo-code.model';
import {ProductModel} from './product.model';
import {AddressModel} from './address.model';
import {UserModel} from './user.model';

export class OrderModel {
  id: string;
  state: number;
  promo_code?: PromoCodeModel;
  created_at: string;
  products: ProductModel[];
  addresses: AddressModel[];
  user: UserModel;
  shipping_fees: number;
}
