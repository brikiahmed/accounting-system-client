import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {ProductModel} from '../../_models/product.model';
import {CategoryModel} from '../../_models/category.model';
import {Globals} from '../../_globals/Globals';
import {ProviderModel} from '../../_models/provider.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BillModel} from '../../_models/bill.model';

@Component({
  selector: 'app-form-bill',
  templateUrl: './form-bill.component.html',
  styleUrls: ['./form-bill.component.scss']
})
export class FormBillComponent implements OnInit {

  categories: CategoryModel[];
  categoryUrl;
  categoryForm: FormGroup;

  loading: boolean;

  billId: string;
  bill: BillModel;

  productForm: FormGroup;
  products: ProductModel[];
  productUrl: string;

  @Input() paymentType;

  private readonly billUrl: string;
  billForm: FormGroup;

  drawerVisible = false;
  childrenDrawerVisible: boolean;

  @Output() formEmitter: EventEmitter<{ billForm: FormGroup, providerForm: FormGroup, newProvider: boolean }>;

  private providerUrl: string;
  providers: ProviderModel[];
  newProvider: boolean;
  providerForm: FormGroup;

  accessFromRoute: boolean;


  constructor(private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.productUrl = Globals.apiUrl + Globals.product;
    this.categoryUrl = Globals.apiUrl + Globals.category;
    this.billUrl = Globals.apiUrl + Globals.bill;
    this.formEmitter = new EventEmitter<{ billForm: FormGroup, providerForm: FormGroup, newProvider: boolean }>();
    this.providerUrl = Globals.apiUrl + Globals.provider;
    router.events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.accessFromRoute = e.url.includes('bill');
        }
      });
    route.params
      .subscribe(params => {
        this.billId = params.id;
      });
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllProviders();
    this.initCategoryForm();
    this.initProductForm();
    this.initBillForm();
    this.initProviderForm();
    this.emitForm();
    if (this.billId) {
      this.getOneBill();
    }
  }


  get total() {
    let total = 0;
    total += this.billForm.value.tax_stamp;
    for (const product of (this.billForm.controls.products as FormArray).controls) {
      total += product.value.quantity * product.value.price;
      // console.log(product);
    }
    return total;
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required]
    });
  }


  initProviderForm() {
    this.providerForm = this.fb.group({
      name: [null]
    });
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      category_id: [null, Validators.required]
    });
  }


  initBillForm() {
    this.billForm = this.fb.group({
      date: [this.bill ? this.bill.date : null, Validators.compose([
        Validators.required
      ])],
      deadline: [this.bill ? this.bill.deadline : null, this.accessFromRoute ? Validators.required : null],
      tax_stamp: [this.bill ? this.bill.tax_stamp : 0.6, Validators.required],
      provider_id: [this.bill ? this.bill.provider.id : null, Validators.required],
      products: this.fb.array(this.bill ? [this.createProduct()] : []),
      provision: this.bill ? this.bill.provision : this.accessFromRoute !== null && this.accessFromRoute !== undefined
    });

    if (this.bill) {
      (this.billForm.controls.products as FormArray).clear();
      for (const product of this.bill.products) {
        (this.billForm.controls.products as FormArray).push(this.createProduct(product));
      }
    }
  }

  getOneBill() {
    this.loading = true;
    this.crud.getOne<BillModel>(this.billUrl, this.billId)
      .subscribe(bill => {
        this.bill = bill;
        this.initBillForm();
        this.loading = false;
      });
  }

  getAllProducts() {
    this.crud.getAll<ProductModel[]>(this.productUrl)
      .subscribe(products => {
        this.products = products;
      });
  }

  getAllCategories() {
    this.crud.getAll<CategoryModel[]>(this.categoryUrl)
      .subscribe(categories => {
        this.categories = categories;
      });
  }


  getAllProviders() {
    this.crud.getAll<ProviderModel[]>(this.providerUrl)
      .subscribe(providers => {
        this.providers = providers;
      });
  }


  createProduct(product: ProductModel = null): FormGroup {
    return this.fb.group({
      product_id: [product ? product.id : null, Validators.required],
      quantity: [product ? (product.purchase ? product.purchase.quantity : 0) : null, Validators.required],
      price: [product ? (product.purchase ? product.purchase.price : 0) : null, Validators.required]
    });
  }

  addProduct(product: ProductModel = null): void {
    const products = this.billForm.get('products') as FormArray;
    products.push(this.createProduct(product));
  }

  deleteProduct(i: number) {
    const products = this.billForm.get('products') as FormArray;

    products.removeAt(i);

    if (products.length === 0) {
      this.addProduct();
    }
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  openChildrenDrawer(): void {
    this.childrenDrawerVisible = true;
  }

  closeChildrenDrawer(): void {
    this.childrenDrawerVisible = false;
  }

  emitForm() {
    console.log(this.billForm);
    this.formEmitter.emit({billForm: this.billForm, providerForm: this.providerForm, newProvider: this.newProvider});
  }

  preventDefault($event: MouseEvent) {
    $event.preventDefault();
  }


  postCategory() {
    this.loading = true;
    this.crud.post<CategoryModel>(this.categoryUrl, this.categoryForm.value)
      .subscribe(category => {
        this.categories.push(category);
        this.closeChildrenDrawer();
        this.initCategoryForm();
        this.productForm.controls.category_id.setValue(category.id);
        this.loading = false;
      });
  }

  postProduct() {
    this.loading = true;
    this.crud.post<ProductModel>(this.productUrl, this.productForm.value)
      .subscribe(product => {
        this.products.push(product);
        this.closeDrawer();
        this.initProductForm();
        this.addProduct(product);
        this.loading = false;
      });
  }

  setValidators() {

    if (this.newProvider) {
      this.providerForm.controls.name.setValidators(Validators.required);
      console.log(this.providerForm);
      this.billForm.controls.provider_id.setValue(0);
      // this.selectedProvider = null;
    } else {
      this.initProviderForm();
      this.billForm.controls.provider_id.setValue(null);

    }
  }

  submitForm($event: MouseEvent) {
    $event.preventDefault();
    this.loading = true;
    if (this.newProvider) {
      this.crud.post<ProviderModel>(this.providerUrl, this.providerForm.value)
        .subscribe(provider => {
          this.billForm.controls.provider_id.setValue(provider.id);
          this.postBill();
        });
    } else {
      this.postBill();
    }
  }

  postBill() {
    if (!this.billId) {
      this.crud.post(this.billUrl, this.billForm.value)
        .subscribe(() => {
          // this.accessFromRoute ? this.router.navigate(['/bill']) :
          //   ((this.paymentType === 0 || this.paymentType === 1) ?
          //     (this.paymentType === 0 ?
          //       this.router.navigate(['/payment/cash']) :
          //       this.router.navigate(['/payment/check'])) : '');

          this.router.navigate(['/bill']);
          this.loading = false;
        });
    } else {
      this.crud.put(this.billUrl, this.billId, this.billForm.value)
        .subscribe(() => {
          this.router.navigate(['/bill/' + this.billId]);
        });
    }
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
  }
}
