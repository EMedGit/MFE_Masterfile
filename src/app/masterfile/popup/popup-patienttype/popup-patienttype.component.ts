import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientType } from 'src/app/models/patienttype.model';
import { PatienttypeService } from 'src/app/services/patienttype.service';

@Component({
  selector: 'app-popup-patienttype',
  templateUrl: './popup-patienttype.component.html',
  styleUrls: ['./popup-patienttype.component.css']
})
export class PopupPatienttypeComponent implements OnInit {

  patienttypeForm : FormGroup;
  formBuilder : FormBuilder;
  patienttype : PatientType;
  arrPatientType : PatientType[] = [];
  patienttypeList : PatientType[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private patienttypeService : PatienttypeService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.patienttypeForm.patchValue(this.config.data.patienttype);
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.patienttypeForm = this.formBuilder.group(
      {
        description: ['']
      });
  }
  ClosePopUp(data:PatientType){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.patienttypeService.postPatientType(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);
        });
    }
  }
  updateData(){
    let data = this.config.data.patienttype;
    let obj = new PatientType();
    obj.description = this.patienttypeForm.controls['description'].value;
    obj.createdDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){

      this.patienttypeService.putPatientType(data.id, obj).subscribe({
      next: (result : PatientType) => {
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
  getValue(): PatientType {
    this.patienttype = new PatientType();
    this.patienttype.description = this.patienttypeForm.controls['description'].value;
    return this.patienttype;
  }
}
