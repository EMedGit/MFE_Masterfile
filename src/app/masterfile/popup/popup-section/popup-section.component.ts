import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { Section } from 'src/app/models/section.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-popup-section',
  templateUrl: './popup-section.component.html',
  styleUrls: ['./popup-section.component.css']
})
export class PopupSectionComponent implements OnInit {

  sectionForm: FormGroup;
  formBuilder: FormBuilder;

  section: Section;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  hfList: HealthFacility[];
  ddHFList: HealthFacility[];
  selectedHF: HealthFacility;

  departmentList: Department[];
  ddDepartmentList: Department[];
  selectedDepartment: Department;
  
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private sectionService : SectionService, 
    private departmentService: DepartmentService, private hfService: HealthFacilityService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.section.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.sectionForm.patchValue(this.config.data.section)    
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.sectionForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        departmentId: [''],
        healthFacilityId: [''],
      });
      
    this.hfService.getHealthFacility('','',0,100).subscribe({
      next: (result: HealthFacility[]) => {
        this.hfList = result;
         this.ddHFList = this.hfList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('dropdown hf complete');
        console.log(this.hfList);
      }
    });
      
    this.departmentService.getDepartments('','',0,0,100).subscribe({
      next: (result: Department[]) => {
        this.departmentList = result;
        this.departmentList = this.departmentList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('dropdown departmentlist complete');
        console.log(this.departmentList);
      }
    });

  }

  ClosePopUp(data: Section){
    console.log(this.ref);
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving){
      this.sectionService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }     
  }

  updateData(){   
    let dp = Object.assign(this.selectedDepartment,this.sectionForm.controls['departmentId'].value); 

    let data = this.config.data.section;
    data.code = this.sectionForm.controls['code'].value;
    data.description = this.sectionForm.controls['description'].value;
    data.departmentID = dp.id;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if(this.isForUpdating){
      this.sectionService.update(data.id, data).subscribe({
      next: (result : Section) => {
        data = result;
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

  getData() : Section {
    let dp = Object.assign(this.selectedDepartment,this.sectionForm.controls['departmentId'].value);

    this.section = new Section();
    this.section.code = this.sectionForm.controls['code'].value;
    this.section.description = this.sectionForm.controls['description'].value;
    this.section.departmentID = dp.id;

    this.section.createdBy = '';
    this.section.createdDateTime = new Date();
    
    return this.section;

  }

  changeHF() {
    console.log(this.selectedHF.id);
    this.ddDepartmentList = this.departmentList.filter(x => x.status && x.healthFacilityId == this.selectedHF.id);
    console.log(this.ddDepartmentList);
  }

}
