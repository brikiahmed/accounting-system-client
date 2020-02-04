import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {CategoryModel} from '../../_models/category.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  productUrl: string;
  categoryUrl: string;
  productForm: FormGroup;
  categories: CategoryModel[] = [];

  constructor(private crud: CrudService,
              private fb: FormBuilder) {
    this.productUrl = Globals.apiUrl + Globals.product;
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.loadCategories();
    this.initProductForm();
  }

  loadCategories() {
    this.crud.getAll<CategoryModel[]>(this.categoryUrl).subscribe(data => {
      // console.log(data);
      this.categories = data;
    });
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category_id: ['']
    });
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
    this.crud.post(this.productUrl, this.productForm.value).subscribe(data => {
      console.log(data);
    });
  }

}
