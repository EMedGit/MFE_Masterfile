import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pharmacy } from 'src/app/models/pharmacy.model';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-pharmacy',
  templateUrl: './popup-pharmacy.component.html',
  styleUrls: ['./popup-pharmacy.component.css']
})
export class PopupPharmacyComponent implements OnInit {

  pharmacyForm : FormGroup;
  formBuilder : FormBuilder;
  pharmacy : Pharmacy;
  arrPharmacy : Pharmacy[] = [];
  pharmacyList : Pharmacy[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private pharmacyService : PharmacyService, private datePipe : DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.pharmacyForm.patchValue(this.config.data.pharmacy);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.pharmacyForm = this.formBuilder.group(
      {
        code : [''],
        description : ['']
      });
  }
  ClosePopUp(data : Pharmacy){
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.pharmacyService.GetPharmacyByCode(this.pharmacyForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.pharmacyForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
        this.pharmacyService.postPharmacyService(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
      }
    });
    }
  }
  updateData(){    
    let data = this.config.data.pharmacy;
    let obj = new Pharmacy();
    obj.code = this.pharmacyForm.controls['code'].value;
    obj.description = this.pharmacyForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.pharmacyService.putPharmacyService(data.id, obj).subscribe({
      next: (result : Pharmacy) => {
          obj = result;
          this.ClosePopUp(result); 
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {        
        console.log('complete');
      }
      });
    }
  }
  getValue(): Pharmacy {
    this.pharmacy = new Pharmacy();
    this.pharmacy.code = this.pharmacyForm.controls['code'].value;
    this.pharmacy.description = this.pharmacyForm.controls['description'].value;
    return this.pharmacy;
  }
}
