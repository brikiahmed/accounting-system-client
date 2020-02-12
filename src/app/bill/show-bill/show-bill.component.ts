import {Component, OnInit} from '@angular/core';
import {BillModel} from '../../_models/bill.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-show-bill',
  templateUrl: './show-bill.component.html',
  styleUrls: ['./show-bill.component.scss']
})
export class ShowBillComponent implements OnInit {

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  bill: BillModel;
  billId;

  billUrl;
  loading: any;

  constructor(private crud: CrudService, private route: ActivatedRoute) {
    this.billUrl = Globals.apiUrl + Globals.bill;
    route.params.subscribe(params => {
      this.billId = params.id;
      this.getOneBill();
    });

  }

  ngOnInit() {
  }

  getOneBill() {
    this.loading = true;
    this.crud.getOne<BillModel>(this.billUrl, this.billId)
      .subscribe(bill => {
        this.bill = bill;
        this.loading = false;
      });
  }

  get total() {
    if (this.bill) {
      let total = 0;
      total += this.bill.tax_stamp;
      for (const product of this.bill.products) {
        total += product.purchase.quantity * product.purchase.price;
      }
      return total;
    } else {
      return 0;
    }
  }

}
