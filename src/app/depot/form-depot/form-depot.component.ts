import {Component, Input, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../_globals/Globals';
import {DepotModel} from '../../_models/depot.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-form-depot',
  templateUrl: './form-depot.component.html',
  styleUrls: ['./form-depot.component.scss']
})
export class FormDepotComponent implements OnInit {
  depotUrl: string;
  depotForm: FormGroup;
  newDepot: boolean;
  //depotType: boolean ;
  addSubmitButton: boolean;
  loading: boolean;
  selectedType: any;
  newType: boolean;
  depots: DepotModel[] = []
  @Input() depotType;

  constructor(private crud: CrudService,
              private fb: FormBuilder,
              private router: Router) {
    this.depotUrl = Globals.apiUrl + Globals.depot;
  }

  ngOnInit() {
    this.initDepotForm();
    this.loadType();
  }
  loadType() {
    this.crud.getAll<DepotModel[]>(this.depotUrl).subscribe(data => {
      // console.log(data);
      this.depots = data;
    });
  }


  initDepotForm() {
    this.depotForm = this.fb.group({
      type : [''], amount: ['', Validators.required],
    });
  }
  /*postDepot() {
    this.crud.post(this.depotUrl, this.depotForm.value)
      .subscribe(() => {
        this.addSubmitButton ? this.router.navigate(['/depot']) :
          ((this.depotType === 0 || this.depotType === 1) ?
            (this.depotType === 0 ?
              this.router.navigate(['/depot/box']) :
              this.router.navigate(['/depot/bank'])) : '');

        this.loading = false;
      });
  }*/

  changeType(e) {
    // console.log(e.target.value)
    this.depotForm.get('type').setValue(e.target.value, {
      onlySelf: true
    });
  }

  submit() {
    this.crud.post(this.depotUrl, this.depotForm.value).subscribe(data => {
      console.log(data);
    });
    /*$event.preventDefault();
    this.loading = true;
    if (this.newDepot) {
      this.crud.post<DepotModel>(this.depotUrl, this.depotForm.value)
        .subscribe(depot => {
          this.depotForm.controls.depot_id.setValue(depot.id);
          this.postDepot();
        });
    } else {
      this.postDepot();
    }
  */}

}
