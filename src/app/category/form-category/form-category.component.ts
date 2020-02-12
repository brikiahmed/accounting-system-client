import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../_globals/Globals';
import {CategoryModel} from '../../_models/category.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  category: CategoryModel;
  categoryUrl: string;
  categoryForm: FormGroup;
  loaded = false;

  constructor(private crud: CrudService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.route.params.subscribe(params => {
      this.crud.getOne(this.categoryUrl, params.id).subscribe((data: CategoryModel) => {
        console.log(data);
        this.category = data;
        this.initCategoryForm();
      });
    });
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [this.category.name, Validators.required]
    });
    this.loaded = true;
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    console.log(this.categoryForm.value);
    this.crud.put(this.categoryUrl, this.category.id, this.categoryForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['category']);
    });
  }
}
