import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductModel} from '../../_models/product.model';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productUrl: string;
  loading: boolean;
  products: ProductModel[];

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.productUrl = Globals.apiUrl + Globals.product;
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    this.crud.getAll<ProductModel[]>(this.productUrl)
      .subscribe(products => {
        console.log(products);
        this.products = products;
        this.loading = false;
      });
  }

  delete(id: string) {
    this.crud.delete(this.productUrl, id).subscribe(data => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
