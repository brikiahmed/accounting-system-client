import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {BillModel} from '../../_models/bill.model';
import {ProviderModel} from '../../_models/provider.model';
import {CategoryModel} from '../../_models/category.model';
import {ProductModel} from '../../_models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentUrl: string;
  paymentType: boolean;

  billForm: FormGroup;
  newBill: boolean;
  selectedBill: any;
  bills: BillModel[];
  billWithoutPayment: string;


  selectedProvider: any;
  newProvider: boolean;
  providerForm: FormGroup;
  private providerUrl: string;
  private readonly billUrl: string;

  loading: boolean;


  constructor(private crud: CrudService,
              private router: Router,
              private fb: FormBuilder) {
    this.billUrl = Globals.apiUrl + Globals.bill;
    this.billWithoutPayment = this.billUrl + Globals.no_payment;
    this.paymentUrl = Globals.apiUrl + Globals.payment;
    this.providerUrl = Globals.apiUrl + Globals.provider;
  }


  ngOnInit() {
    this.getAllBills();
    this.initPaymentForm();
    this.billForm = this.fb.group({});
    this.providerForm = this.fb.group({});
  }

  submitForm(): void {
    console.log(this.providerForm.controls);
    for (const key in this.paymentForm.controls) {
      this.paymentForm.controls[key].markAsDirty();
      this.paymentForm.controls[key].updateValueAndValidity();
    }
    for (const key in this.billForm.controls) {
      this.billForm.controls[key].markAsDirty();
      this.billForm.controls[key].updateValueAndValidity();
    }
    for (const key in this.providerForm.controls) {
      this.providerForm.controls[key].markAsDirty();
      this.providerForm.controls[key].updateValueAndValidity();
    }

    this.loading = true;

    console.log(this.billForm.value, this.paymentForm.value, this.selectedBill);
    // if user selected existing bill
    if (!this.newBill) {
      this.paymentForm.controls.bill_id.setValue(this.selectedBill);
      this.postPayment();
    } else {
      // if user created new bill
      if (!this.newProvider) {
        // if user selected exiting provider
        // this.billForm.controls.provider_id.setValue(this.selectedProvider);
        this.postBill();
      } else {
        // if user created new provider
        this.crud.post<ProviderModel>(this.providerUrl, this.providerForm.value)
          .subscribe(provider => {
            this.billForm.controls.provider_id.setValue(provider.id);
            this.postBill();
          });
      }
    }
  }

  postBill() {
    console.log('creating bill');
    this.crud.post<BillModel>(this.billUrl, this.billForm.value)
      .subscribe(bill => {
        this.paymentForm.controls.bill_id.setValue(bill.id);
        this.postPayment();
      });
  }

  postPayment() {
    this.crud.post(this.paymentUrl, this.paymentForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate([this.paymentType ? '/payment/check' : '/payment/cash']);
        this.loading = false;
      });

  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.billForm.reset();
    for (const key in this.billForm.controls) {
      this.billForm.controls[key].markAsPristine();
      this.billForm.controls[key].updateValueAndValidity();
    }
  }

  initPaymentForm() {
    this.paymentForm = this.fb.group({
      check_number: [null],
      date: [null],
      bill_id: [null]
    });
  }

  getAllBills() {
    this.crud.getAll<BillModel[]>(this.billWithoutPayment)
      .subscribe(bills => {
        this.bills = bills;
      });
  }


  setValidators() {
    if (this.paymentType) {
      this.paymentForm.controls.check_number.setValidators(Validators.required);
      this.paymentForm.controls.date.setValidators(Validators.required);
    } else {
      this.initPaymentForm();
    }
    if (this.newBill) {
      // this.billForm.controls.tax_stamp.setValidators(Validators.required);
      // this.billForm.controls.date.setValidators(Validators.required);
      this.selectedBill = null;
    } else {
      // this.initBillForm();
      this.billForm = this.fb.group({});
    }
  }


}
