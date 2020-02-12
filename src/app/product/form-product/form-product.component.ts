import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {CategoryModel} from '../../_models/category.model';
import {ProductModel} from '../../_models/product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  product: ProductModel;
  productUrl: string;
  categoryUrl: string;
  productForm: FormGroup;
  categories: CategoryModel[] = [];
  loaded = false;

  constructor(private crud: CrudService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.productUrl = Globals.apiUrl + Globals.product;
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    this.route.params.subscribe(params => {
      this.crud.getOne(this.productUrl, params.id).subscribe((data: ProductModel) => {
        console.log(data);
        this.product = data;
        this.loadCategories();
        this.initProductForm();
      });
    });
  }

  loadCategories() {
    this.crud.getAll<CategoryModel[]>(this.categoryUrl).subscribe(data => {
      // console.log(data);
      this.categories = data;
    });
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      category_id: [this.product.category.id]
    });
    this.loaded = true;
  }

  changeCategory(e) {
    // console.log(e.target.value)
    this.productForm.get('category_id').setValue(e.target.value, {
      onlySelf: true
    });
  }

  submit() {
    if (this.productForm.invalid) {
      return;
    }
    // console.log(this.productForm.value);
    this.crud.put(this.productUrl, this.product.id, this.productForm.value).subscribe(data => {
      console.log(data);
    });
  }

}
