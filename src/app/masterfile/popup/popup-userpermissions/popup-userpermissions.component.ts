import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Users } from 'src/app/models/user.model';
import { Claim, UserClaim } from 'src/app/models/userclaims.model';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-popup-userpermissions',
  templateUrl: './popup-userpermissions.component.html',
  styleUrls: ['./popup-userpermissions.component.css'],
})
export class PopupUserpermissionsComponent implements OnInit {
  usersForm: FormGroup;
  formBuilder: FormBuilder;
  selectedUserpermissions: Claim[];
  prevuserpermissions: Claim[];
  userpermissions: Claim[] = [];
  listpermissions: Claim[] = [];
  userclaims: UserClaim = new UserClaim();
  checkstate: boolean = false;
  isForSaving = false;
  isForUpdating = false;
  searchkey: '';
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private usersService: UsersService,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loaddata();
  }
  ClosePopUp(data: Users) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  filter() {
    let filter: any[] = [];
    this.userpermissions.forEach((val) => {
      if (val.type.toUpperCase().includes(this.searchkey.toUpperCase())) {
        filter.push(val);
      }
    });
    this.prevuserpermissions = filter;
  }
  saveData() {
    this.usersService.addupdateuserclaims(this.getValue()).subscribe({
      next: (retVal) => {},
      error: (err) => {
        console.log(err);
        this.toastService.showError(err.error.messages);
      },
      complete: () => {
        this.toastService.showSuccess('User permission saved successfully!');
        this.ref.close(this.userpermissions);
      },
    });
  }
  formValid(): boolean {
    let str = '';

    return false;
  }
  updateData() {
    // this.usersService.updateuser(this.users.id,this.getValue()).subscribe({
    //   next: (retVal) => {},
    //   error: (err) => {
    //     console.log(err)
    //     this.toastService.showError(err.error.messages);
    //   },
    //   complete: () => {
    //     this.toastService.showSuccess('User updated successfully!');
    //     console.log(this.users)
    //     this.ref.close(this.users);
    //   },
    // });
  }
  getValue(): UserClaim {
    this.userpermissions.forEach((value) => {
      value.value = value.checkboxvalue ? '1' : '0';
    });
    this.userclaims = {
      userId: this.config.data.users.id,
      claims: this.userpermissions.filter((x) => x.value),
    };
    console.log(this.userclaims);
    return this.userclaims;
  }
  loaddata() {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    let list = this.usersService
      .getUserClaims(this.config.data.users.id)
      .subscribe({
        next: (retVal) => {
          this.listpermissions = retVal;
        },
        error: (err) => {
          console.log(err.error);
        },
        complete:()=>{
          this.listpermissions.forEach((val) => {
            let claim = new Claim();
            let stringvalue = val.value as unknown;
            claim.type = val.type;
            claim.checkboxvalue = stringvalue == '1' ? true : false;
            this.userpermissions.push(claim);
          });
          this.prevuserpermissions = this.userpermissions;
        }
      });
  }
  selectRow() {
    if (this.checkstate) {
      this.userpermissions.forEach((value) => {
        value.checkboxvalue = true;
      });
    } else {
      this.userpermissions.forEach((value) => {
        value.checkboxvalue = false;
      });
    }
  }
}
