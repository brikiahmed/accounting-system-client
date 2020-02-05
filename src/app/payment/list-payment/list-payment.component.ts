import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {PaymentModel} from '../../_models/payment.model';
import {GlobalModule} from '../../_globals/global.module';
import {Globals} from '../../_globals/Globals';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent implements OnInit {

  paymentUrl;
  payments: PaymentModel[];
  checkUrl;
  loading: boolean;
  type: string;

  // checkPayments: PaymentModel[];
  cashUrl;

  // cashPayments: PaymentModel[];

  constructor(private crud: CrudService,
              private router: Router) {
    this.paymentUrl = Globals.apiUrl + Globals.payment;
    this.checkUrl = this.paymentUrl + Globals.check;
    this.cashUrl = this.paymentUrl + Globals.cash;
    router.events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          console.log(e);
          if (e.url.includes('cash')) {
            this.getAllPayments(this.cashUrl);
            this.type = 'cash';
          }
          if (e.url.includes('check')) {
            this.getAllPayments(this.checkUrl);
            this.type = 'check';
          }
        }
      });
  }

  ngOnInit() {
    // this.getAllPayments();
    // console.log(this.router.url);
    // this.router.events
    //   .subscribe(e => {
    //     if (e instanceof NavigationEnd) {
    //       console.log(e);
    //     }
    //   });
  }

  getAllPayments(url) {
    // this.getChecks();
    // this.getCash();
    this.loading = true;
    this.crud.getAll<PaymentModel[]>(url)
      .subscribe(payments => {
        this.payments = payments;
        this.loading = false;
      });
  }

  // getChecks() {
  //   this.crud.getAll<PaymentModel[]>(this.checkUrl)
  //     .subscribe(checkPayments => {
  //       this.checkPayments = checkPayments;
  //     });
  // }
  //
  // getCash() {
  //   this.crud.getAll<PaymentModel[]>(this.cashUrl)
  //     .subscribe(cashPayments => {
  //       this.cashPayments = cashPayments;
  //     });
  // }

}
