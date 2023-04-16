import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Users } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-popup-user',
  templateUrl: './popup-user.component.html',
  styleUrls: ['./popup-user.component.css'],
})
export class PopupUserComponent implements OnInit {
  usersForm: FormGroup;
  formBuilder: FormBuilder;
  users: Users = new Users();
  arrusers: Users[] = [];
  usersList: Users[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  prefixlist: any;
  usertypelist: any;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private usersService: UsersService,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.loaddata();
    this.buildFormGroup();
    this.patchValue();
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.usersForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.maxLength(20)]],
      password: [
        null,
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      confirmPassword: [null, Validators.required],
      email: ['user@example.com', [Validators.required, Validators.email]],
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      extensionName: [''],
      dateOfBirth: [null, Validators.required],
      position: [null, Validators.required],
      mobileNo: [null, [Validators.required, Validators.minLength(11)]],
      userTypeId: [{ description: 'Doctor' }, Validators.required],
      license: [''],
      s2License: [''],
      prefix: [{ description: 'Dr.' }, Validators.required],
    });
  }
  ClosePopUp(data: Users) {
    this.ref.close(data);
  }
  passwordValidator(data: any): boolean {
    const passwordLowerCaseRegexp: RegExp = /^(?=.*[a-z])/;
    const passwordUpperCaseRegexp: RegExp = /^(?=.*[A-Z])/;
    const passwordNumberRegexp: RegExp = /^(?=.*[0-9])/;
    const passwordRegexpSpecialChar: RegExp =
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!passwordLowerCaseRegexp.test(data)) {
      return false;
    }
    if (!passwordUpperCaseRegexp.test(data)) {
      return false;
    }
    if (!passwordNumberRegexp.test(data)) {
      return false;
    }
    if (!passwordRegexpSpecialChar.test(data)) {
      return false;
    }
    return true;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      if (!this.formValid()) {
        this.usersService.register(this.getValue()).subscribe({
          next: (retVal) => {},
          error: (err) => {
            this.toastService.showError(err.error.messages);
          },
          complete: () => {
            this.toastService.showSuccess('User saved successfully!');
            this.ref.close(this.users);
          },
        });
      }
    }
  }
  formValid(): boolean {
    let str = '';

    if (this.lastName?.errors != null) {
      str += 'Lastname is required.\n ';
    }
    if (this.firstName?.errors != null) {
      str += 'Firstname is required.\n ';
    }
    if (this.dateOfBirth?.errors != null) {
      str += 'Date of birth is required.\n ';
    }
    if (this.email?.errors != null) {
      str += 'Email is required.\n Email is not incorrect format.\n ';
    }
    if (this.mobileNo?.errors != null) {
      str += 'Contact no. is required.\n ';
    }
    if (this.userTypeId?.errors != null) {
      str += 'User type is required.\n ';
    }
    if (this.position?.errors != null) {
      str += 'Position is required.\n ';
    }
    if (this.username?.errors != null) {
      str += 'Username is required. \n Username max length is 20. \n';
    }
    if (this.password?.errors != null) {
      str += 'Password is required. \n Password min length is 6. \n';
      str +=
        'Password must consist of 1 lowercase. \n Password must consist of 1 uppercase. \n';
      str +=
        'Password must consist of 1 number. \n Password must consist of 1 special character. \n';
    } else {
      if (!this.passwordValidator(this.password?.value)) {
        str += 'Password is required. \n Password min length is 6. \n';
        str +=
          'Password must consist of 1 lowercase. \n Password must consist of 1 uppercase. \n';
        str +=
          'Password must consist of 1 number. \n Password must consist of 1 special character. \n';
      }
    }
    if (this.confirmPassword?.errors != null) {
      str += 'Confirm password is required.\n';
    } else {
      if (this.password?.errors == null) {
        if (this.passwordValidator(this.password?.value)) {
          if (this.password?.value !== this.confirmPassword?.value) {
            str += "Password and confirm password didn't match.\n";
          }
        }
      }
    }
    if (str != '') {
      this.toastService.showError(str);
      return true;
    }
    return false;
  }
  updateData() {
    if (this.isForUpdating) {
      if (!this.formValid()) {
        this.usersService.updateuser(this.users.id,this.getValue()).subscribe({
          next: (retVal) => {},
          error: (err) => {
            console.log(err)
            this.toastService.showError(err.error.messages);
          },
          complete: () => {
            this.toastService.showSuccess('User updated successfully!');
            this.ref.close(this.users);
          },
        });
      }
    }
  }
  resetPassword() {
    this.usersService.resetDefaultPassword(this.users.id).subscribe({
      next: () => {},
      error: (err) => {
        this.toastService.showError(err.error.messages);
      },
      complete: () => {
        this.toastService.showSuccess('Password reset to default successfully!');
        this.ref.close(this.users);
      }
    });
  }
  getValue(): Users {
    this.users = Object.assign(this.users, this.usersForm.value);
    this.users.prefix = this.usersForm.controls['prefix'].value.description;
    this.users.fullName = this.users.lastName.concat(
      ', ',
      this.users.firstName,
      ' ',
      this.users.middleName,
      ' ',
      this.users.extensionName
    );
    this.users.userTypeId =
      this.usersForm.controls['userTypeId'].value.description;
    this.users.isActive = true;
    return this.users;
  }
  loaddata() {
    this.prefixlist = this.usersService.prefix;
    this.usertypelist = this.usersService.usertype;
  }
  patchValue() {
    if(this.config.data.users!= null || this.config.data.users!=undefined){
    this.users = this.config.data.users;
    this.usersForm.patchValue(this.users);
    console.log(this.users);
    this.prefix?.patchValue({ description: this.users.prefix });
    this.userTypeId?.patchValue({ description: this.users.userTypeId });
    this.dateOfBirth?.patchValue(new Date(this.users.dateOfBirth));
    this.password?.patchValue('P@ssw0rd');
    this.confirmPassword?.patchValue('P@ssw0rd');
    }
  }
  get username() {
    return this.usersForm.get('userName');
  }
  get password() {
    return this.usersForm.get('password');
  }
  get confirmPassword() {
    return this.usersForm.get('confirmPassword');
  }
  get email() {
    return this.usersForm.get('email');
  }
  get lastName() {
    return this.usersForm.get('lastName');
  }
  get firstName() {
    return this.usersForm.get('firstName');
  }
  get middleName() {
    return this.usersForm.get('middleName');
  }
  get extensionName() {
    return this.usersForm.get('extensionName');
  }
  get dateOfBirth() {
    return this.usersForm.get('dateOfBirth');
  }
  get position() {
    return this.usersForm.get('position');
  }
  get mobileNo() {
    return this.usersForm.get('mobileNo');
  }
  get userTypeId() {
    return this.usersForm.get('userTypeId');
  }
  get license() {
    return this.usersForm.get('license');
  }
  get s2License() {
    return this.usersForm.get('s2License');
  }
  get prefix() {
    return this.usersForm.get('prefix');
  }
}
