import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiagnosticCenter } from 'src/app/models/diagnosticcenter.model';
import { DiagnosticcenterService } from 'src/app/services/diagnosticcenter.service';

@Component({
  selector: 'app-popup-diagnosticcenter',
  templateUrl: './popup-diagnosticcenter.component.html',
  styleUrls: ['./popup-diagnosticcenter.component.css']
})
export class PopupDiagnosticcenterComponent implements OnInit {

  diagnosticCenterForm : FormGroup;
  formBuilder : FormBuilder;
  diagnosticCenter : DiagnosticCenter;
  arrDiagnosticCenter : DiagnosticCenter[] = [];
  diagnosticCenterList : DiagnosticCenter[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  constructor(private ref : DynamicDialogRef,
    private config : DynamicDialogConfig,
    private diagnosticcenterService : DiagnosticcenterService,
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.diagnosticCenterForm.patchValue(this.config.data.diagnosticcenter);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.diagnosticCenterForm = this.formBuilder.group(
      {
        code : [''],
        description : ['']
      });
  }
  ClosePopUp(data : DiagnosticCenter){
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.diagnosticcenterService.postDiagnosticCenter(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.diagnosticcenter;
    let obj = new DiagnosticCenter();
    obj.code = this.diagnosticCenterForm.controls['code'].value;
    obj.description = this.diagnosticCenterForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.diagnosticcenterService.putDiagnosticCenter(data.id, obj).subscribe({
      next: (result : DiagnosticCenter) => {
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
  getValue(): DiagnosticCenter {
    this.diagnosticCenter = new DiagnosticCenter();
    this.diagnosticCenter.code = this.diagnosticCenterForm.controls['code'].value;
    this.diagnosticCenter.description = this.diagnosticCenterForm.controls['description'].value;
    return this.diagnosticCenter;
  }
}
