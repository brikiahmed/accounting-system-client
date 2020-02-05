import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {BillModel} from '../../_models/bill.model';
import {ProviderModel} from '../../_models/provider.model';

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
  providers: ProviderModel[];
  private providerUrl: string;

  constructor(private crud: CrudService,
              private fb: FormBuilder) {
    this.billWithoutPayment = Globals.apiUrl + Globals.bill + Globals.no_payment;
    this.paymentUrl = Globals.apiUrl + Globals.payment;
    this.providerUrl = Globals.apiUrl + Globals.provider;
  }

  ngOnInit() {
    this.getAllBills();
    this.getAllProviders();
    this.initPaymentForm();
    this.initBillForm();
    this.initProviderForm();
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
    console.log(this.billForm.value, this.paymentForm.value, this.selectedBill);
    if (!this.newBill) {
      this.paymentForm.controls.bill_id.setValue(this.selectedBill);
      this.postPayment();
    } else {
      if (!this.newProvider) {
        this.billForm.controls.provider_id.setValue(this.selectedProvider);
        this.postBill();
      } else {
        this.crud.post<ProviderModel>(this.providerUrl, this.providerForm.value)
          .subscribe(provider => {
            this.billForm.controls.provider_id.setValue(provider.id);
            this.postBill();
          });
      }
    }
  }

  postBill() {

    this.crud.post<BillModel>(this.billWithoutPayment, this.billForm.value)
      .subscribe(bill => {
        this.paymentForm.controls.bill_id.setValue(bill.id);
        this.postPayment();
      });
  }

  postPayment() {
    this.crud.post(this.paymentUrl, this.paymentForm.value)
      .subscribe(data => {
        console.log(data);
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

  initProviderForm() {
    this.providerForm = this.fb.group({
      name: [null]
    });
  }

  initBillForm() {
    this.billForm = this.fb.group({
      date: [null, Validators.compose([
        Validators.required
      ])],
      // deadline: [null],
      tax_stamp: 0.6,
      provider_id: [null]
    });
  }

  getAllBills() {
    this.crud.getAll<BillModel[]>(this.billWithoutPayment)
      .subscribe(bills => {
        this.bills = bills;
      });
  }

  getAllProviders() {
    this.crud.getAll<ProviderModel[]>(this.providerUrl)
      .subscribe(providers => {
        this.providers = providers;
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
      this.billForm.controls.tax_stamp.setValidators(Validators.required);
      this.billForm.controls.date.setValidators(Validators.required);
      this.selectedBill = null;
    } else {
      this.initBillForm();
    }
    if (this.newProvider) {
      this.providerForm.controls.name.setValidators(Validators.required);
      console.log(this.providerForm);
      this.selectedProvider = null;
    } else {
      this.initProviderForm();
    }
  }
}
