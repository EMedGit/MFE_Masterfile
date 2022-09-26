import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Province } from 'src/app/models/province.model';
import { Region } from 'src/app/models/region.model';
import { AddressService } from 'src/app/services/address.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-province',
  templateUrl: './popup-province.component.html',
  styleUrls: ['./popup-province.component.css']
})
export class PopupProvinceComponent implements OnInit {

  provinceForm : FormGroup;
  formBuilder : FormBuilder;
  province : Province;
  arrProvince : Province[]=[];
  provinceList : Province[];
  region: Region[]=[];

  provinces : Province[] = [];
  regions: Region;
  id : number = 0;
  regionCode : string;
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
    this.provinceForm.patchValue(this.config.data.province);
  }
  loadData() : void {
    this.addressService.GetRegionById(0).subscribe(retVal => {
      this.region = retVal;
    });
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.provinceForm = this.formBuilder.group(
      {
        provinceCode: [''],
        provinceName: [''],
        regionCode: [null, Validators.required]
      });
  }
  ClosePopUp(data : Province){
    this.ref.close(data);
  }
  selectedItem(event : any){
    this.regionCode = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.addressService.postProvince(this.getValue()).subscribe({
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
  getValue(): Province {
    this.province = new Province();
    this.region.forEach(element => {
      if(element.regionCode == this.regionCode)
      {
        this.province.regionId = element.id;
      }
    });
    this.province.regionCode = this.provinceForm.controls['regionCode'].value;
    this.province.provinceCode = this.provinceForm.controls['provinceCode'].value;
    this.province.provinceName = this.provinceForm.controls['provinceName'].value;
    this.province.createdBy = 'admin';
    return this.province;
  }
  onValueChanges() : void {
    this.provinceForm.valueChanges.subscribe(value => {
      value.regionName = this.region.find(t => t.regionCode == value.regionCode)?.regionName ?? null;
      this.address.next(Object.assign(value));
    });
    this.provinceForm.get('provinceCode')?.valueChanges.subscribe();
  } 
  updateData(){
    let data = this.config.data.province;
    let obj = new Province();
    this.region.forEach(element => {
      if (element.regionCode == this.regionCode)
      {
        obj.regionId = element.id;
      }
    });
    obj.regionCode = this.provinceForm.controls['regionCode'].value;
    obj.provinceCode = this.provinceForm.controls['provinceCode'].value;
    obj.provinceName = this.provinceForm.controls['provinceName'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.addressService.putProvince(data.id, obj).subscribe({
        next : (result : Province) => {
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
}
