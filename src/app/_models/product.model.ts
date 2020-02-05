import {CategoryModel} from './category.model';

export class ProductModel {
  id: string;
  name: string;
  category: CategoryModel;
}
