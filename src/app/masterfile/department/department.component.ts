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

  ref: DynamicDialogRef;
  department: Department;
  departments: Department[];
  selectedDepartments: Department[];

  constructor(private departmentService : DepartmentService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    try {
      this.departmentService
        .getDepartments('','',0,100)
        .subscribe((retval : Department[]) => {
          console.log(retval);
          this.departments = retval;
        });
    }
    catch (error){
      console.log
    }
  }

  filter(value: any) {
    this.departments.every(a => a.description?.includes(value.key));
  }

  addDepartmentPopup()
  {
    this.dialogService.open(PopupDepartmentComponent, {
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
  }




}
