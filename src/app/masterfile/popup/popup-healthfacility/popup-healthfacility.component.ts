import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
=======
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42

@Component({
  selector: 'app-popup-healthfacility',
  templateUrl: './popup-healthfacility.component.html',
  styleUrls: ['./popup-healthfacility.component.css']
})
export class PopupHealthfacilityComponent implements OnInit {

<<<<<<< HEAD
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
    this.healthFacilityForm.patchValue(this.config.data.healthFacility)    
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.healthFacilityForm = this.formBuilder.group(
      {
        code: [''],
        name: [''],
        facilityaddress: ['']     
      });
  }

  ClosePopUp(data: HealthFacility){
    this.ref.close();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving){
        this.healthFacilityService.insert(this.getData()).subscribe( result => { this.ClosePopUp(result); } );
    }
    else{

    } 
  }

  updateData(){    
    let data = this.config.data.HealthFacility;
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
    let obj : HealthFacility = {
      id : this.healthFacilityForm.controls['id'].value,
      code : this.healthFacilityForm.controls['code'].value,
      name : this.healthFacilityForm.controls['name'].value,
      facilityaddress : this.healthFacilityForm.controls['facilityaddress'].value
    }

    return obj;
  }


=======
  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
}
