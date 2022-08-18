import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Users } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { PopupUserComponent } from '../popup/popup-user/popup-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DialogService,ConfirmationService],
})
export class UsersComponent implements OnInit {
  searchkey: '';
  ref: DynamicDialogRef;
  users: Users;
  prevUsersList: Users[];
  usersList: Users[] = [];
  selectedUsers: Users[];
  items: MenuItem[];
  constructor(
    private usersService: UsersService,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.usersService.getUsersList().subscribe({
      next: (result: Users[]) => {
        this.usersList = result;
        this.prevUsersList = this.usersList.filter((x) => x.isActive);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
    this.items = [
      {
        label: 'Add Permission',
        icon: 'pi pi-fw pi-user-plus',
        command: () => console.log(this.selectedUsers),
      },
      {
        label: 'Add Health Facility',
        icon: 'pi pi-fw pi-building',
        command: () => console.log(this.selectedUsers),
      },
    ];
  }

  filter() {
    let filter: any[] = [];
    this.usersList.forEach((val) => {
      if (
        val.fullName.toUpperCase().includes(this.searchkey.toUpperCase()) &&
        val.isActive
      ) {
        filter.push(val);
      }
    });
    this.prevUsersList = filter;
  }

  addUsersPopup() {
    this.ref = this.dialogService.open(PopupUserComponent, {
      width: '1200px',
      height: '750px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true,
      },
    });
    this.ref.onClose.subscribe((data: Users) => {
      console.log(data);
      if (data != undefined) {
        this.usersList.push(data);
        this.prevUsersList = this.usersList.filter((x) => x.isActive);
      }
    });
  }
  updateUsersPopUp(users: Users) {
    this.ref = this.dialogService.open(PopupUserComponent, {
      width: '1200px',
      height: '750px',
      showHeader: true,
      closable: true,
      data: {
        users,
        isForUpdating: true,
      },
    });
    this.ref.onClose.subscribe((data: Users) => {
      if (data != undefined) {
        this.usersList.forEach((val) => {
          if (val.id == data.id) {
            val = Object.assign(val, data);
          }
        });
        this.prevUsersList = this.usersList.filter((x) => x.isActive);
      }
    });
  }

  removeUsersRecord(data: Users) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to deactivate this selected user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(data)
        data.password='P@ssw0rd';
        data.confirmPassword='P@ssw0rd';
        data.isActive = false;
       this.usersService.updateuser(data.id,data).subscribe({
         next:(retVal)=>{
           if(retVal){
            this.toastService.showSuccess('User deactivated successfully.');
           }
        
         },
         complete:()=>{
          this.fetchData()
         }
       })
    }});
  }
  batchdeleteUsers() {
    // if (this.selectedUsers.length > 0) {
    //   console.log(this.selectedUsers)
    //   this.selectedUsers.forEach(val => {
    //     val.modifiedBy = '';
    //     val.modifiedDateTime = this.datePipe.transform(
    //       new Date(), 'yyyy-MM-ddTHH:mm:ss'
    //     ) as string;
    //     val.status = false;
    //   });
    //   this.usersService.batchdeleteUsers(this.selectedUsers).subscribe({
    //     next: (result: boolean) => {
    //       if (result) {
    //         this.UsersList.forEach(val => {
    //           let x = this.selectedUsers.find(x => x.id == val.id);
    //           if (x != undefined && x != null) {
    //             val.status = false;
    //           }
    //         });
    //       }
    //     },
    //     error: (err: any) => {
    //       console.log(err);
    //     },
    //     complete: () => {
    //       console.log('complete');
    //       this.prevUsersList = this.UsersList.filter(x => x.status);
    //     }
    //   });
    // }
  }
}
