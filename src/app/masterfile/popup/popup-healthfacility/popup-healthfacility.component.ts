import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-healthfacility',
  templateUrl: './popup-healthfacility.component.html',
  styleUrls: ['./popup-healthfacility.component.css']
})
export class PopupHealthfacilityComponent implements OnInit {

  healthFacilityForm: FormGroup;
  formBuilder: FormBuilder;

  healthFacility: HealthFacility;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private healthFacilityService : HealthFacilityService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.healthFacility.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    
    this.buildFormGroup();
    this.healthFacilityForm.patchValue(this.config.data.healthFacility)    
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.healthFacilityForm = this.formBuilder.group(
      {
        code: [''],
        name: [''],
        facilityAddress: ['']
      });

  }

  ClosePopUp(data: HealthFacility){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving) {
      this.healthFacilityService.GetHealthFacilityByHealthFacilityCode(this.healthFacilityForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.healthFacilityForm.controls['code'].value.toUpperCase())
        if(obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } return this.healthFacilityService.insert(this.getData()).subscribe(result => { this.ClosePopUp(result); });     
    })
    }
  }

  updateData(){    
    let data = this.config.data.healthFacility;
    let obj = new HealthFacility();
    obj.code = this.healthFacilityForm.controls['code'].value;
    obj.name = this.healthFacilityForm.controls['name'].value;
    obj.facilityAddress = this.healthFacilityForm.controls['facilityAddress'].value;
    obj.modifiedBy = '';
    obj.modifiedDateTime = new Date();
    if(this.isForUpdating){
      this.healthFacilityService.update(data.id, obj).subscribe({
      next: (result : HealthFacility) => {
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

  getData() : HealthFacility {
    this.healthFacility = new HealthFacility();
    this.healthFacility.code = this.healthFacilityForm.controls['code'].value;
    this.healthFacility.name = this.healthFacilityForm.controls['name'].value;
    this.healthFacility.facilityAddress = this.healthFacilityForm.controls['facilityAddress'].value
    this.healthFacility.createdBy = '';
    this.healthFacility.createdDateTime = new Date();
    return this.healthFacility;
  }


}
