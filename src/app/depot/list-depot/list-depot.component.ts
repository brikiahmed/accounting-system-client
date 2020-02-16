import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {DepotModule} from '../depot.module';
import {DepotModel} from '../../_models/depot.model';
import {BillModel} from '../../_models/bill.model';
import {PaymentModel} from '../../_models/payment.model';

@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.scss']
})
export class ListDepotComponent implements OnInit {
  depotUrl: string;
  depots: DepotModel[];
  nbElements: number;
  loading: boolean;
  sortBy: { key: string; value: string };
  searchFields;
  searchForm: FormGroup;
  searchKey: string;
  search: Subscription;
  type: string;
  BankUrl;
  BoxUrl;



  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
    this.depotUrl = Globals.apiUrl + Globals.depot;
    this.BankUrl = this.depotUrl + Globals.bank;
    this.BoxUrl = this.depotUrl + Globals.box;
    router.events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          console.log(e);
          if (e.url.includes('bank')) {
            this.getAllDepots(this.BankUrl);
            this.type = '0';
          }
          if (e.url.includes('box')) {
            this.getAllDepots(this.BoxUrl);
            this.type = '1';
          }
        }
      });
  }

  ngOnInit() {
  }

  getAllDepots(url) {
    // this.getChecks();
    // this.getCash();
    this.loading = true;
    this.crud.getAll<DepotModel[]>(url)
      .subscribe(depots => {
        this.depots = depots;
        this.loading = false;
      });
  }
  /*
  getAllDepots(offset: number = 0, limit = 15) {
    let url;
    this.nbSearchFields > 0 ? url = this.depotUrl + Globals.search : url = this.depotUrl;

    url += ('?offset=' + offset + '&limit=' + limit);

    if (this.sortBy) {
      url += ('&order_by=' + this.sortBy.key + '&order_by_type=' + this.sortBy.value);
    }

    // console.log(Object.keys(this.searchFields));
    // for (const field of Object.keys(this.searchFields)) {
    //   console.log(field);
    //   console.log(this.searchFields[field]);
    //   if (this.searchFields[field] !== '') {
    //     url += ('&' + field + '=' + this.searchFields[field]);
    //   }
    // }

    this.loading = true;
    this.crud.getAllPaginate<{ count: number, elements: DepotModel[] }>(this.depotUrl, offset, 10)
      .subscribe(depots => {
        this.depots = depots.elements;
        this.nbElements = depots.count;
        this.loading = false;
      });
  }

  get nbSearchFields() {
    let nb = 0;
    return nb;
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
      this.getAllDepots((pi - 1) * 10);

    } else {
      console.log('search');
      this.searchDepot((pi - 1) * 10);
    }
  }

  searchDepot(offset: number = 0) {
    if (this.search) {
      this.search.unsubscribe();
    }
    if (this.searchForm.value.key === '') {
      this.searchKey = null;
      this.loadData(1);
      return;
    }

    this.searchAllDepots(this.depotUrl, offset);
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      key: ''
    });
  }

  searchAllDepots(url, offset: number = 0) {
    this.loading = true;
    this.search = this.crud.searchPaginate<{ count: number, elements: DepotModel[] }>(url, this.searchForm.value.key, offset, 10)
      .subscribe(depots => {
        this.depots = depots.elements;
        this.nbElements = depots.count;
        this.searchKey = this.searchForm.value.key;
        this.loading = false;
      });
  }*/


}
