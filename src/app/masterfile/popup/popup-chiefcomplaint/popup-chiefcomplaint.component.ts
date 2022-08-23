import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChiefComplaint } from 'src/app/models/chiefcomplaint.model';
import { ChiefcomplaintService } from 'src/app/services/chiefcomplaint.service';

@Component({
  selector: 'app-popup-chiefcomplaint',
  templateUrl: './popup-chiefcomplaint.component.html',
  styleUrls: ['./popup-chiefcomplaint.component.css']
})
export class PopupChiefcomplaintComponent implements OnInit {

  chiefcomplaintForm : FormGroup;
  formBuilder : FormBuilder;
  chiefcomplaint : ChiefComplaint;
  arrChiefComplaint : ChiefComplaint[] = [];
  chiefcomplaintList : ChiefComplaint[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private chiefcomplaintService : ChiefcomplaintService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.chiefcomplaintForm.patchValue(this.config.data.chiefcomplaint);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.chiefcomplaintForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data:ChiefComplaint){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.chiefcomplaintService.postChiefcomplaint(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.chiefcomplaint;
    let obj = new ChiefComplaint();
    obj.code = this.chiefcomplaintForm.controls['code'].value;
    obj.description = this.chiefcomplaintForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.chiefcomplaintService.putChiefcomplaint(data.id, obj).subscribe({
      next: (result : ChiefComplaint) => {
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
  getValue(): ChiefComplaint {
    this.chiefcomplaint = new ChiefComplaint();
    this.chiefcomplaint.code = this.chiefcomplaintForm.controls['code'].value;
    this.chiefcomplaint.description = this.chiefcomplaintForm.controls['description'].value;
    return this.chiefcomplaint;
  }
}