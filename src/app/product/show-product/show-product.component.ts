import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../_models/category.model';
import {ProductModel} from '../../_models/product.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  productUrl: string;
  loading: boolean;
  product: ProductModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.productUrl = Globals.apiUrl + Globals.product;
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.crud.getOne<ProductModel>(this.productUrl, params.id)
        .subscribe(product => {
          console.log(product);
          this.product = product;
          this.loading = false;
        });
    });
  }

}
