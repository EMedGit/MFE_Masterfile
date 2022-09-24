import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { BulkUserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

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

  healthFacilityId: number;
  healthfacility: HealthFacility;
  healthFacilityList: HealthFacility[];
  bulkUserHealthFacility: BulkUserHealthFacility;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private departmentService: DepartmentService,
    private usersService: UsersService, private hfService: HealthFacilityService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.department.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.departmentForm.patchValue(this.config.data.department)
    this.loadData();
  }
  loadData(): void {
    this.hfService.getHealthFacility().subscribe(retVal => { this.healthFacilityList = retVal; });
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.departmentForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        healthFacilityId: [null, Validators.required]
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
      this.departmentService.GetDepartmentByCode(this.departmentForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.departmentForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.hfService.getHealthFacilityById(this.departmentForm.controls['healthFacilityId'].value).subscribe(retVal => {
            this.healthfacility = retVal;
            this.departmentService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
          });
        }
      });
    }
  }

  updateData() {
    let data = this.config.data.department;
    data.code = this.departmentForm.controls['code'].value;
    data.description = this.departmentForm.controls['description'].value;
    data.healthFacilityId = this.departmentForm.controls['healthFacilityId'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.hfService.getHealthFacilityById(this.departmentForm.controls['healthFacilityId'].value).subscribe(retVal => {
        this.healthfacility = retVal;
        data.healthFacilityCode = this.healthfacility.code;
        this.departmentService.update(data.id, data).subscribe({
          next: (result: Department) => {
            data = result;
            this.ClosePopUp(result);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.usersService.bulkUpdateUserHealthFacility(this.getUserHealthFacility()).subscribe({
              next: (retVal) => {
              }, error: (err) => {
                this.toastService.showError(err.error.messages);
              }, complete: () => {
                this.toastService.showSuccess('Successfully Updated.');
              }
            });
          }
        });
      });
    }
  }
  getUserHealthFacility(): BulkUserHealthFacility {
    let data = this.config.data.department;
    this.bulkUserHealthFacility = new BulkUserHealthFacility();
    this.bulkUserHealthFacility.departmentId = data.id;
    this.bulkUserHealthFacility.departmentName = this.departmentForm.controls['description'].value;
    this.bulkUserHealthFacility.type = 'Department';
    return this.bulkUserHealthFacility;
  }
  getData(): Department {
    this.department = new Department();
    this.department.code = this.departmentForm.controls['code'].value;
    this.department.description = this.departmentForm.controls['description'].value;
    this.department.healthFacilityId = this.departmentForm.controls['healthFacilityId'].value;
    this.department.healthFacilityCode = this.healthfacility.code;
    this.department.createdBy = '';
    this.department.createdDateTime = new Date();
    return this.department;
  }

}
