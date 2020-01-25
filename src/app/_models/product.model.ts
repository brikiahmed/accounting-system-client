import {CategoryModel} from './category.model';
import {WarningModel} from './warning.model';
import {ProductContentModel} from './productContent.model';
import {ReductionModel} from './reduction.model';
import {ImageModel} from './image.model';

export class ProductModel {
  id: string;
  name: string;
  description: string;
  remaining_quantity: number;
  price: number;
  category: CategoryModel;
  warnings: WarningModel[];
  product_contents: ProductContentModel[];
  reductions: ReductionModel[];
  images: ImageModel[];
  pivot?: {
    order_id: string,
    product_id: string,
    price: number,
    quantity: number
  };
}
