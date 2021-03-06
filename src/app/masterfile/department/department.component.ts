import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import { PopupDepartmentComponent } from '../popup/popup-department/popup-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DialogService]
})
export class DepartmentComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  department: Department;
  departments: Department[];
  selectedDepartments: Department[];
  newDepartmentsList: Department[];

  constructor(private departmentService : DepartmentService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.departmentService.getDepartments('','',0,100).subscribe({
      next: (result: Department[]) => {
        this.departments = result;
        this.newDepartmentsList = this.departments.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
      }
    })
  }

  filter() {
    //this.departments.every(a => a.description?.includes(value.key));
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

  addDepartmentPopup()
  {
    this.ref = this.dialogService.open(PopupDepartmentComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'DEPARTMENT DETAILS',
      closable: true,
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

  updateDepartmentPopup(department : Department) {
    this.dialogService.open(PopupDepartmentComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'DEPARTMENT DETAILS',
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
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newDepartmentsList = this.departments.filter(x => x.status);
      }
    })
  }


  removeDepartment(department : Department) {
    this.departmentService.delete(department.id).subscribe({
      next : (result : boolean) => {
        result;
        this.departments.forEach(element => {
          if (department.id == element.id)
          {
            element.status = false;
          }
        });
      },
      error : (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.newDepartmentsList = this.departments.filter(x => x.status);
      }
    });
  }


}
