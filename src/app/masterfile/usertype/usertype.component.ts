import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserType } from 'src/app/models/usertype.model';
import { UserTypeService } from 'src/app/services/usertype.service';
import { PopupUserTypeComponent } from '../popup/popup-usertype/popup-usertype.component';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css'],
  providers: [DialogService]
})
export class UsertypeComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  userType: UserType;
  userTypeList: UserType[];
  newUserTypeList: UserType[];
  selectedUserTypes: UserType[];

  constructor(private userTypeService: UserTypeService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.userTypeService
        .getList('','',0,9999)
        .subscribe((retval : UserType[]) => {
          console.log(retval);          
          this.userTypeList = retval;
          this.newUserTypeList = this.userTypeList.filter(x => x.status);
        });
    }
    catch (error){
      console.log(error);
    }
  }

  filter() {
    //this.sections.every(a => a.description?.includes(value.key));

    console.log(this.selectedUserTypes)
    let filter: any[] = [];
    this.newUserTypeList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newUserTypeList = filter;
  }

  
  addUserTypePopup()
  {
    this.dialogService.open(PopupUserTypeComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        section: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: UserType) => {
      if (data != undefined) {
        this.userTypeList.push(data);
        this.newUserTypeList = this.userTypeList.filter(x => x.status);
      }
    })
  }

  updateUserTypePopup(section : UserType) {
    this.dialogService.open(PopupUserTypeComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        section,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: UserType) => {

      if (data != undefined) {
        this.userTypeList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newUserTypeList = this.userTypeList.filter(x => x.status);
      }
    })
  }

  removeUserType(data : UserType) {
    this.userTypeService.delete(data.id).subscribe({
      next : (result : boolean) => {
        result;
        this.userTypeList.forEach(element => {
          if (data.id == element.id)
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
        this.newUserTypeList = this.userTypeList.filter(x => x.status);
      }
    });
  }

}
