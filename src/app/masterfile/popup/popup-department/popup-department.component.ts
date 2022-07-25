import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-popup-department',
  templateUrl: './popup-department.component.html',
  styleUrls: ['./popup-department.component.css']
})
export class PopupDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  formBuilder: FormBuilder;

  department: Department;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private departmentService : DepartmentService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.department.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    
    this.buildFormGroup();
    this.departmentForm.patchValue(this.config.data.department)   
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.departmentForm = this.formBuilder.group(
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
        this.departmentService.insert(this.getData()).subscribe((retval) => { this.department = retval });
    }
    else{

    } 
    this.ClosePopUp();  
  }


  getData() : Department {
    let obj : Department = {
      code : this.departmentForm.controls['code'].value,
      description : this.departmentForm.controls['description'].value
    }

    return obj;
  }

}
