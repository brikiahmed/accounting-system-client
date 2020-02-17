import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../_models/category.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categoryUrl: string;
  loading: boolean;
  categories: CategoryModel[];

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this.crud.getAll<CategoryModel[]>(this.categoryUrl)
      .subscribe(categories => {
        console.log(categories);
        this.categories = categories;
        this.loading = false;
      });
  }

  delete(id: string) {
    this.crud.delete(this.categoryUrl, id).subscribe(data => {
      this.categories = this.categories.filter(category => category.id !== id);
    });
  }
}
