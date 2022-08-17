import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChiefComplaint } from 'src/app/models/chiefcomplaint.model';
import { ChiefComplaintDetail } from 'src/app/models/chiefcomplaintdetail.model';
import { ChiefcomplaintService } from 'src/app/services/chiefcomplaint.service';
import { ChiefcomplaintdetailService } from 'src/app/services/chiefcomplaintdetail.service';

@Component({
  selector: 'app-popup-chiefcomplaintdetail',
  templateUrl: './popup-chiefcomplaintdetail.component.html',
  styleUrls: ['./popup-chiefcomplaintdetail.component.css']
})
export class PopupChiefcomplaintdetailComponent implements OnInit {

  chiefcomplaint : ChiefComplaint;
  chiefcomplaintList : ChiefComplaint[];
  chiefcomplaintdetailForm : FormGroup;
  formBuilder : FormBuilder;
  chiefcomplaintdetail : ChiefComplaintDetail;
  arrChiefComplaintDetail : ChiefComplaintDetail[] = [];
  chiefcomplaintdetailList : ChiefComplaintDetail[];
  id : number = 0;
  
  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private chiefcomplaintdetailService : ChiefcomplaintdetailService, 
    private datePipe : DatePipe,
    private chiefcomplaintService : ChiefcomplaintService) { }


  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.loadData();
    this.buildFormGroup();
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.chiefcomplaintdetailForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']   
      });
  }
  loadData() : void {
    this.chiefcomplaintService.getChiefcomplaint().subscribe(retval => {
      this.chiefcomplaintList = retval;
      console.log(this.chiefcomplaintList,'f');
    });
  }
  ClosePopUp(data : ChiefComplaintDetail){
    this.ref.close(data);
  }
  selectedItem(event : any){
    this.chiefcomplaint = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.chiefcomplaintdetailService.postChiefcomplaintdetail(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.chiefcomplaintdetail;
    let obj = new ChiefComplaintDetail();
    if(this.chiefcomplaint == undefined)
    {
      obj.chiefComplaintId = data.id;
    } else {
      obj.chiefComplaintId = this.chiefcomplaint.id;
    }
    obj.code = this.chiefcomplaintdetailForm.controls['code'].value;
    obj.description = this.chiefcomplaintdetailForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.chiefcomplaintdetailService.putChiefcomplaintdetail(data.id, obj).subscribe({
      next: (result : ChiefComplaintDetail) => {
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
  getValue(): ChiefComplaintDetail {
    this.chiefcomplaintdetail = new ChiefComplaintDetail();
    if(this.chiefcomplaint == undefined)
    {
      let x = this.chiefcomplaintList.find(x => x.id);
      this.chiefcomplaintdetail.chiefComplaintId = x?.id;

    } else {
      this.chiefcomplaintdetail.chiefComplaintId = this.chiefcomplaint.id;
    }
    this.chiefcomplaintdetail.code = this.chiefcomplaintdetailForm.controls['code'].value;
    this.chiefcomplaintdetail.description = this.chiefcomplaintdetailForm.controls['description'].value;
    return this.chiefcomplaintdetail;
  }
}
