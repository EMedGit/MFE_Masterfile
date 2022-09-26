import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Municipality } from 'src/app/models/municipality.model';
import { Province } from 'src/app/models/province.model';
import { AddressService } from 'src/app/services/address.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-municipality',
  templateUrl: './popup-municipality.component.html',
  styleUrls: ['./popup-municipality.component.css']
})
export class PopupMunicipalityComponent implements OnInit {

  municipalityForm : FormGroup;
  formBuilder : FormBuilder;
  municipality : Municipality;
  arrMunicipality : Municipality[]=[];
  municipalityList : Municipality[];
  province : Province[] = [];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  address = new BehaviorSubject<Address>(new Address());
  outputAddress: EventEmitter<Address> = new EventEmitter<Address>();
  outputAddressForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private addressService : AddressService, private datePipe : DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.buildFormGroup();
    this.loadData();
    this.municipalityForm.patchValue(this.config.data.municipality);
  }
  loadData() : void {
    this.addressService.GetProvinceByCode('').subscribe(retVal => {
      this.province = retVal;
    });
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.municipalityForm = this.formBuilder.group(
      {
        municipalityCode: [''],
        municipalityName: [''],
        provinceCode: [null, Validators.required]
      });
  }
  ClosePopUp(data : Municipality){
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.addressService.postMunicipality(this.getValue()).subscribe({
        next: result => {
          this.ClosePopUp(result);
        }, error: (err) => {
          this.toastService.showError(err.error.messages);
        }, complete: () => {
          this.toastService.showSuccess('Successfully Saved.');
        }
      });
    }
  }
  updateData(){
    let data = this.config.data.municipality;
    let obj = new Municipality();
    obj.municipalityCode = this.municipalityForm.controls['municipalityCode'].value;
    obj.municipalityName = this.municipalityForm.controls['municipalityName'].value;
    obj.provinceCode = this.municipalityForm.controls['provinceCode'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      console.log('try', obj);
      this.addressService.putMunicipality(data.id, obj).subscribe({
        next : (result : Municipality) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error : (err) => {
          this.toastService.showError(err.error.messages);
        },
        complete : () => {
          this.toastService.showSuccess('Successfully Updated.');
        }
      });
    }
  }
  getValue(): Municipality {
    this.municipality = new Municipality();
    this.municipality.municipalityCode = this.municipalityForm.controls['municipalityCode'].value;
    this.municipality.municipalityName = this.municipalityForm.controls['municipalityName'].value;
    this.municipality.provinceCode = this.municipalityForm.controls['provinceCode'].value;
    this.municipality.createdBy = 'admin';
    return this.municipality;
  }
  onValueChanges() : void {
    this.municipalityForm.valueChanges.subscribe(value => {
      value.provinceName = this.province.find(t => t.provinceCode == value.provinceCode)?.provinceName ?? null;
      this.address.next(Object.assign(value));
    });
    this.municipalityForm.get('provinceCode')?.valueChanges.subscribe();
  } 
}
