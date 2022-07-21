import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Immunization } from 'src/app/models/immunization.model';
import { ImmunizationService } from 'src/app/services/immunization.service';

@Component({
  selector: 'app-popup-immunization',
  templateUrl: './popup-immunization.component.html',
  styleUrls: ['./popup-immunization.component.css']
})
export class PopupImmunizationComponent implements OnInit {

  immunizationForm: FormGroup;
  formBuilder: FormBuilder;

  immunization: Immunization;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private immunizationService : ImmunizationService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.immunization.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.immunizationForm.patchValue(this.config.data.immunization)    
  }
  
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.immunizationForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        immunizationTypeId: null       
      });
  }
  
  ClosePopUp(){
    this.ref.close();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving){
        this.immunizationService.addImmunization(this.getImmunizationData()).subscribe((retval) => { this.immunization = retval });
    }
    else{

    } 
    this.ClosePopUp();  
  }

  getImmunizationData() : Immunization {
    //build data
    let obj : Immunization = {
      code : this.immunizationForm.controls['code'].value,
      description : this.immunizationForm.controls['description'].value,
      immunizationTypeId :this.immunizationForm.controls['immunizationTypeId'].value
    }

    return obj;
  }
}
