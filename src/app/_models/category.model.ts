import {ProductModel} from './product.model';

export class CategoryModel {
  id: string;
  name: string;
  products: ProductModel[];
}
