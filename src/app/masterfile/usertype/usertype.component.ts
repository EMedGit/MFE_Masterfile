import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserType } from 'src/app/models/usertype.model';
import { UserTypeService } from 'src/app/services/usertype.service';
import { PopupUserTypeComponent } from '../popup/popup-usertype/popup-usertype.component';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class UsertypeComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  userType: UserType;
  userTypeList: UserType[];
  newUserTypeList: UserType[];
  selectedUserTypes: UserType[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private userTypeService: UserTypeService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.userTypeService
        .getList()
        .subscribe((retval: UserType[]) => {
          console.log(retval);
          this.userTypeList = retval;
          this.newUserTypeList = this.userTypeList.filter(x => x.status);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  filter() {
    console.log(this.selectedUserTypes)
    let filter: any[] = [];
    this.newUserTypeList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    this.newUserTypeList = filter;
  }


  addUserTypePopup() {
    this.ref = this.dialogService.open(PopupUserTypeComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      closable: true,
      data: {
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

  updateUserTypePopup(userType: UserType) {
    this.ref = this.dialogService.open(PopupUserTypeComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        userType,
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

  removeUserType(data: UserType) {
    if (data != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userTypeService.delete(data.id).subscribe({
            next: (result: boolean) => {
              result;
              this.userTypeList.forEach(element => {
                if (data.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.newUserTypeList = this.userTypeList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}
