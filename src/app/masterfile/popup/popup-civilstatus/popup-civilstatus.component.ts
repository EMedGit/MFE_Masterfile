import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CivilStatus } from 'src/app/models/civilstatus.model';
import { CivilstatusService } from 'src/app/services/civilstatus.service';

@Component({
  selector: 'app-popup-civilstatus',
  templateUrl: './popup-civilstatus.component.html',
  styleUrls: ['./popup-civilstatus.component.css']
})
export class PopupCivilstatusComponent implements OnInit {

  civilstatusForm: FormGroup;
  formBuilder: FormBuilder;
  civilstatus: CivilStatus;
  arrCivilStatus: CivilStatus[] = [];

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private civilstatusService : CivilstatusService ) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.buildFormGroup();
    this.civilstatusForm.patchValue(this.config.data.civilStatus);
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.civilstatusForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']   
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
        this.civilstatusService.postCivilStatus(this.getValue()).subscribe();
    }
    else{
    } 
    this.ClosePopUp();  
  }

  // saveData(){   
  //   if(this.isForSaving){
  //     // this.civilstatusService.postCivilStatus(this.getValue()).subscribe((retval) => { this.civilstatus = retval });     
  //     this.civilstatusService.postCivilStatus(this.getValue()).subscribe((result: boolean) => {this.arrCivilStatus.push(this.getValue())} );
  //   }else{      
  //   }
  //   this.ClosePopUp(); 
  // }

  getValue(): CivilStatus {
    // const currentDate = new Date();
    this.civilstatus = new CivilStatus();
    this.civilstatus.code = this.civilstatusForm.controls['code'].value;
    this.civilstatus.description = this.civilstatusForm.controls['description'].value;
    // this.civilstatus.createdBy = this.civilstatusForm.controls['createdBy'].value;
    // this.civilstatus.createdDateTime = currentDate;
    console.log(this.civilstatus,'test');
    return this.civilstatus;
  }

  // getValue() : CivilStatus {
  //   let obj : CivilStatus = {
  //     code : this.civilstatusForm.controls['code'].value,
  //     description : this.civilstatusForm.controls['description'].value,
  //   }
  //   console.log(obj,'keyyyyy');
  //   return obj;
  // }
}
