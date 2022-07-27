import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';

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
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private healthFacilityService : HealthFacilityService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.healthFacility.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    
    this.buildFormGroup();
    console.log(this.config.data.healthFacility)
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
        this.healthFacilityService.insert(this.getData()).subscribe(result => { this.ClosePopUp(result); });
    }
  }

  updateData(){    
    let data = this.config.data.healthFacility;
    let obj = new HealthFacility();
    obj.code = this.healthFacilityForm.controls['code'].value;
    obj.name = this.healthFacilityForm.controls['name'].value;
    obj.facilityaddress = this.healthFacilityForm.controls['facilityaddress'].value;
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
    this.healthFacility = new HealthFacility
    this.healthFacility.code = this.healthFacilityForm.controls['code'].value;
    this.healthFacility.name = this.healthFacilityForm.controls['name'].value;
    this.healthFacility.facilityaddress = this.healthFacilityForm.controls['facilityaddress'].value
    return this.healthFacility;
  }


}
