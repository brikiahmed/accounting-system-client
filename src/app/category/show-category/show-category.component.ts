import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../_models/category.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent implements OnInit {

  categoryUrl: string;
  loading: boolean;
  category: CategoryModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.categoryUrl = Globals.apiUrl + Globals.category;
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.crud.getOne<CategoryModel>(this.categoryUrl, params.id)
        .subscribe(category => {
          console.log(category);
          this.category = category;
          this.loading = false;
        });
    });
  }

}
