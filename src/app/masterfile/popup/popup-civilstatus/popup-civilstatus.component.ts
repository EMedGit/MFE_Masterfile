import { DatePipe } from '@angular/common';
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
  civilstatusList: CivilStatus[];
  id: number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private civilstatusService : CivilstatusService, private datePipe : DatePipe) { }

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
  ClosePopUp(data:CivilStatus){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.civilstatusService.postCivilStatus(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.civilStatus;
    let obj = new CivilStatus();
    obj.code = this.civilstatusForm.controls['code'].value;
    obj.description = this.civilstatusForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.civilstatusService.putCivilStatus(data.id, obj).subscribe({
      next: (result : CivilStatus) => {
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
  getValue(): CivilStatus {
    this.civilstatus = new CivilStatus();
    this.civilstatus.code = this.civilstatusForm.controls['code'].value;
    this.civilstatus.description = this.civilstatusForm.controls['description'].value;
    return this.civilstatus;
  }
}
