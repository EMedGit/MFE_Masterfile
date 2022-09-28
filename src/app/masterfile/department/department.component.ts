import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { BulkUserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { DepartmentService } from 'src/app/services/department.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { PopupDepartmentComponent } from '../popup/popup-department/popup-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class DepartmentComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  department: Department;
  departments: Department[];
  selectedDepartments: Department[];
  newDepartmentsList: Department[];
  bulkUserHealthFacility: BulkUserHealthFacility;
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private departmentService: DepartmentService, private usersService: UsersService, private confirmationService: ConfirmationService, private toastService: ToastService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.departmentService.getDepartments('', '', 0, 0, 100).subscribe({
      next: (result: Department[]) => {
        this.departments = result;
        this.newDepartmentsList = this.departments.filter(x => x.status);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
      }
    })
  }

  filter() {
    console.log(this.selectedDepartments)
    let filter: any[] = [];
    this.newDepartmentsList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newDepartmentsList = filter;
  }

  addDepartmentPopup() {
    this.ref = this.dialogService.open(PopupDepartmentComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        department: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Department) => {
      if (data != undefined) {
        this.departments.push(data);
        this.newDepartmentsList = this.departments.filter(x => x.status);
      }
    })
  }

  updateDepartmentPopup(department: Department) {
    this.ref = this.dialogService.open(PopupDepartmentComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        department,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Department) => {
      if (data != undefined) {
        this.departments.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.healthFacilityId = data.healthFacilityId;
            val.healthFacilityCode = data.healthFacilityCode;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newDepartmentsList = this.departments.filter(x => x.status);
      }
    })
  }

  removeDepartment(department: Department) {
    if (department != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.departmentService.delete(department.id).subscribe({
            next: (result: boolean) => {
              result;
              this.departments.forEach(element => {
                if (department.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              this.newDepartmentsList = this.departments.filter(x => x.status);
              this.usersService.bulkDeleteUserHealthFacility(this.getUserHealthFacility(department)).subscribe({
                next: (retVal) => {
                }, error: (err) => {
                  this.toastService.showError(err.error.messages);
                }, complete: () => {
                  this.toastService.showSuccess('Successfully Deleted.');
                }
              });
            }
          });
        }
      });
    }
  }
  getUserHealthFacility(department: Department): BulkUserHealthFacility {
    this.bulkUserHealthFacility = new BulkUserHealthFacility();
    this.bulkUserHealthFacility.departmentId = department.id;
    this.bulkUserHealthFacility.type = 'Department';
    return this.bulkUserHealthFacility;
  }

}
