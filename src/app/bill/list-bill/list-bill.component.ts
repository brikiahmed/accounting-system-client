import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {BillModel} from '../../_models/bill.model';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {
  billUrl: string;

  nbElements: number;
  loading: boolean;

  bills: BillModel[];


  sortBy: { key: string; value: string };

  searchFields;

  searchForm: FormGroup;

  searchKey: string;

  search: Subscription;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.billUrl = Globals.apiUrl + Globals.bill;
    this.nbElements = 0;
  }

  ngOnInit() {
    this.initSearchForm();
    this.getAllBills();
  }

  getAllBills(offset: number = 0) {
    let url;
    this.nbSearchFields > 0 ? url = this.logUrl + SEARCH : url = this.logUrl;

    url += ('?offset=' + offset + '&limit=' + limit);

    if (this.sortBy) {
      url += ('&order_by=' + this.sortBy.key + '&order_by_type=' + this.sortBy.value);
    }

    console.log(Object.keys(this.searchFields));
    for (const field of Object.keys(this.searchFields)) {
      console.log(field);
      console.log(this.searchFields[field]);
      if (this.searchFields[field] !== '') {
        url += ('&' + field + '=' + this.searchFields[field]);
      }
    }

    this.loading = true;
    this.crud.getAllPaginate<{ count: number, elements: BillModel[] }>(this.billUrl, offset, 10)
      .subscribe(bills => {
        this.bills = bills.elements;
        this.nbElements = bills.count;
        this.loading = false;
      });
  }

  get nbSearchFields() {
    let nb = 0;
    for (const field of Object.keys(this.searchFields)) {
      console.log(field);
      console.log(this.searchFields[field]);
      if (this.searchFields[field] !== '') {
        nb++;
      }
    }
    return nb;
  }


  loadData(pi: number): void {
    if (!this.searchKey) {
      console.log('!search');
      this.getAllBills((pi - 1) * 10);

    } else {
      console.log('search');
      this.searchBill((pi - 1) * 10);
    }
  }

  searchBill(offset: number = 0) {
    if (this.search) {
      this.search.unsubscribe();
    }
    if (this.searchForm.value.key === '') {
      this.searchKey = null;
      this.loadData(1);
      return;
    }

    this.searchAllBills(this.billUrl, offset);
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      key: ''
    });
  }

  searchAllBills(url, offset: number = 0) {
    this.loading = true;
    this.search = this.crud.searchPaginate<{ count: number, elements: BillModel[] }>(url, this.searchForm.value.key, offset, 10)
      .subscribe(bills => {
        this.bills = bills.elements;
        this.nbElements = bills.count;
        this.searchKey = this.searchForm.value.key;
        this.loading = false;
      });
  }

}
