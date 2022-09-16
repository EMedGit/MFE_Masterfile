import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Immunization } from 'src/app/models/immunization.model';
import { ImmunizationType } from 'src/app/models/immunizationtype.model';
import { ImmunizationService } from 'src/app/services/immunization.service';
import { ImmunizationTypeService } from 'src/app/services/immunizationtype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-immunization',
  templateUrl: './popup-immunization.component.html',
  styleUrls: ['./popup-immunization.component.css']
})
export class PopupImmunizationComponent implements OnInit {

  immunizationForm: FormGroup;
  formBuilder: FormBuilder;

  immunization: Immunization;

  isActiveStatus =  false;
  isForSaving = false;
  isForUpdating = false;

  itList: ImmunizationType[];
  selectedIT: ImmunizationType;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private immunizationService: ImmunizationService, 
    private itService: ImmunizationTypeService, private toastService: ToastService) { }

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
    
      this.itService.get('','',0,100).subscribe({
        next: (result: ImmunizationType[]) => {
          this.itList = result;
          this.itList = this.itList.filter(x => x.status);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('getdata complete');
        }
      });
  }
  
  ClosePopUp(data : Immunization){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if (this.isForSaving) {
      this.immunizationService.GetImmunizationByCode(this.immunizationForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.immunizationForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
      this.immunizationService.insert(this.getImmunizationData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }
  });
    }
  }

  getImmunizationData() : Immunization {
    let immunizationType = Object.assign(this.selectedIT,this.immunizationForm.controls['immunizationTypeId'].value);

    this.immunization = new Immunization();
    this.immunization.code = this.immunizationForm.controls['code'].value;
    this.immunization.description = this.immunizationForm.controls['description'].value;
    this.immunization.immunizationTypeId = immunizationType.id;
    this.immunization.createdBy = '';
    this.immunization.createdDateTime = new Date();
    return this.immunization;
  }
  
  updateData() {
    let immunizationType = Object.assign(this.selectedIT,this.immunizationForm.controls['immunizationTypeId'].value);

    let data = this.config.data.immunization;
    data.code = this.immunizationForm.controls['code'].value;
    data.description = this.immunizationForm.controls['description'].value;
    data.immunizationTypeId = immunizationType.id;

    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.immunizationService.update(data.id, data).subscribe({
        next: (result: Immunization) => {
          data = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('update complete');
        }
      });
    }
  }
}
