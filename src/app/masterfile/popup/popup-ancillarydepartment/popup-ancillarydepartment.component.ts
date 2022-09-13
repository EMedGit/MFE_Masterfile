import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillaryDepartment } from 'src/app/models/ancillarydepartment.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { AncillarydepartmentService } from 'src/app/services/ancillarydepartment.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';

@Component({
  selector: 'app-popup-ancillarydepartment',
  templateUrl: './popup-ancillarydepartment.component.html',
  styleUrls: ['./popup-ancillarydepartment.component.css']
})
export class PopupAncillarydepartmentComponent implements OnInit {

  healthfacility : HealthFacility;
  healthFacilityList : HealthFacility[];
  ancillarydepartmentForm : FormGroup;
  formBuilder : FormBuilder;
  ancillarydepartment : AncillaryDepartment;
  arrAncillaryDepartment : AncillaryDepartment[] = [];
  ancillarydepartmentList : AncillaryDepartment[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private ancillarydepartmentService : AncillarydepartmentService, 
    private datePipe : DatePipe,
    private healthfacilityServices : HealthFacilityService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.ancillarydepartmentForm.patchValue(this.config.data.ancillarydepartment);
    this.loadData();
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.ancillarydepartmentForm = this.formBuilder.group(
      {
        code : [''],
        description : ['']
      });
  }
  loadData() : void {
    this.healthfacilityServices.getHealthFacility().subscribe(retval => { 
    return this.healthFacilityList = retval;
    });
  }
  ClosePopUp(data : AncillaryDepartment){
    this.ref.close(data);
  }
  selectedItem(event : any){
    this.healthfacility = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.ancillarydepartmentService.postAncillaryDepartment(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.ancillarydepartment;
    let obj = new AncillaryDepartment();
    if(this.healthfacility == undefined)
    {
      obj.healthFacilityId = data.healthFacilityId;
    } else {
      obj.healthFacilityId = this.healthfacility.id;
    }
    obj.code = this.ancillarydepartmentForm.controls['code'].value;
    obj.description = this.ancillarydepartmentForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.ancillarydepartmentService.putAncillaryDepartment(data.id, obj).subscribe({
      next: (result : AncillaryDepartment) => {
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
  getValue(): AncillaryDepartment {
    this.ancillarydepartment = new AncillaryDepartment();
    if(this.healthfacility == undefined)
    {
      let x = this.healthFacilityList.find(x => x.id); 
      this.ancillarydepartment.healthFacilityId = x?.id;
    } else {
      this.ancillarydepartment.healthFacilityId = this.healthfacility.id;
    }
    this.ancillarydepartment.code = this.ancillarydepartmentForm.controls['code'].value;
    this.ancillarydepartment.description = this.ancillarydepartmentForm.controls['description'].value;
    return this.ancillarydepartment;
  }
}
