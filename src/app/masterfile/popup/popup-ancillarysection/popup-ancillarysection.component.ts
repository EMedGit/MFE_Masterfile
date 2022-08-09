import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillaryDepartment } from 'src/app/models/ancillarydepartment.model';
import { AncillarySection } from 'src/app/models/ancillarysection.model';
import { AncillarydepartmentService } from 'src/app/services/ancillarydepartment.service';
import { AncillarysectionService } from 'src/app/services/ancillarysection.service';

@Component({
  selector: 'app-popup-ancillarysection',
  templateUrl: './popup-ancillarysection.component.html',
  styleUrls: ['./popup-ancillarysection.component.css']
})
export class PopupAncillarysectionComponent implements OnInit {

  ancillarydepartment : AncillaryDepartment;
  ancillarydepartmentList : AncillaryDepartment[];
  ancillarysectionForm : FormGroup;
  formBuilder : FormBuilder;
  ancillarysection : AncillarySection;
  arrAncillarySection : AncillarySection[] = [];
  ancillarysectionList : AncillarySection[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private ancillarysectionService : AncillarysectionService, 
    private datePipe : DatePipe,
    private ancillarydepartmentService : AncillarydepartmentService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.ancillarysectionForm.patchValue(this.config.data.ancillarysection);
    this.loadData();
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.ancillarysectionForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']   
      });
  }
  loadData() : void {
    this.ancillarydepartmentService.getAncillaryDepartment().subscribe(retval => {
      this.ancillarydepartmentList = retval;
    });
  }
  ClosePopUp(data : AncillarySection){
    this.ref.close(data);
  }
  selectedItem(event : any){
    this.ancillarydepartment = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.ancillarysectionService.postAncillarySection(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.ancillarysection;
    let obj = new AncillarySection();
    if(this.ancillarydepartment == undefined)
    {
      obj.ancillaryDepartmentId = data.id;
    } else {
      obj.ancillaryDepartmentId = this.ancillarydepartment.id;
    }
    obj.code = this.ancillarysectionForm.controls['code'].value;
    obj.description = this.ancillarysectionForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.ancillarysectionService.putAncillarySection(data.id, obj).subscribe({
      next: (result : AncillarySection) => {
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
  getValue(): AncillarySection {
    this.ancillarysection = new AncillarySection();
    if(this.ancillarydepartment == undefined)
    {
      let x = this.ancillarydepartmentList.find(x => x.id); 
      this.ancillarysection.ancillaryDepartmentId = x?.id;

    } else {
      this.ancillarysection.ancillaryDepartmentId = this.ancillarydepartment.id;
    }
    this.ancillarysection.code = this.ancillarysectionForm.controls['code'].value;
    this.ancillarysection.description = this.ancillarysectionForm.controls['description'].value;
    return this.ancillarysection;
  }
}
