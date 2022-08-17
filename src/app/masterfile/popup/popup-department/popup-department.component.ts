import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';

@Component({
  selector: 'app-popup-department',
  templateUrl: './popup-department.component.html',
  styleUrls: ['./popup-department.component.css']
})
export class PopupDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  formBuilder: FormBuilder;

  department: Department;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  hfList: HealthFacility[];
  selectedHF: HealthFacility;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private departmentService: DepartmentService, 
    private hfService: HealthFacilityService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.department.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.departmentForm.patchValue(this.config.data.department)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.departmentForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        healthFacilityId: ['']
      });

      this.hfService.getHealthFacility('','',0,100).subscribe({
        next: (result: HealthFacility[]) => {
          this.hfList = result;
          this.hfList = this.hfList.filter(x => x.status);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('dropdown getdata complete');
          console.log(this.hfList);
        }
      });
  }

  ClosePopUp(data: Department) {
    console.log(this.ref);
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.departmentService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }
  }

  updateData() {
    let data = this.config.data.department;
    data.code = this.departmentForm.controls['code'].value;
    data.description = this.departmentForm.controls['description'].value;
    data.healthFacilityId = this.selectedHF.id;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.departmentService.update(data.id, data).subscribe({
        next: (result: Department) => {
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

  getData(): Department {
    let healthfacility = Object.assign(this.selectedHF,this.departmentForm.controls['healthFacilityId'].value);

    this.department = new Department();
    this.department.code = this.departmentForm.controls['code'].value;
    this.department.description = this.departmentForm.controls['description'].value;
    this.department.healthFacilityId = healthfacility.id;
    this.department.createdBy = '';
    this.department.createdDateTime = new Date();
    return this.department;
  }

}
