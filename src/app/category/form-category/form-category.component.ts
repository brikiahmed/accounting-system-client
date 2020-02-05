import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  categoryUrl: string;
  categoryForm: FormGroup;

  constructor(private crud: CrudService,
              private fb: FormBuilder) {
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit() {
    if (this.categoryForm.invalid) {
      return;
    }
    console.log(this.categoryForm.value);
    this.crud.post(this.categoryUrl, this.categoryForm.value).subscribe(data => {
      console.log(data);
    });
  }
}
