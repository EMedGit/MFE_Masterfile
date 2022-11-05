import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { Section } from 'src/app/models/section.model';
import { Users } from 'src/app/models/user.model';
import { Claim, UserClaim } from 'src/app/models/userclaims.model';
import { UserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { SectionService } from 'src/app/services/section.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-popup-userhealthfacility',
  templateUrl: './popup-userhealthfacility.component.html',
  styleUrls: ['./popup-userhealthfacility.component.css'],
  providers: [DialogService,ConfirmationService],
})
export class PopupUserhealthfacilityComponent implements OnInit {
  usersHealthFacilityForm: FormGroup;
  formBuilder: FormBuilder;
  heathfacilitylist: HealthFacility[] = [];
  departmentlist: Department[] = [];
  sectionlist: Section[] = [];
  prevheathfacilitylist: HealthFacility[] = [];
  prevdepartmentlist: Department[] = [];
  prevsectionlist: Section[] = [];
  selectedUserHealthFacility: any;
  prevuserhealthfacility: UserHealthFacility[] = [];
  userhealthfacility: UserHealthFacility[] = [];
  userhealthfacilityobj: UserHealthFacility = new UserHealthFacility();
  isForSaving = false;
  isForUpdating = false;
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private usersService: UsersService,
    private datePipe: DatePipe,
    private toastService: ToastService,
    private healthFacilityService: HealthFacilityService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.buildFormGroup();
    this.loaddata();
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.usersHealthFacilityForm = this.formBuilder.group({
      healthFacilityName: [null, [Validators.required]],
      departmentName: [null],
      sectionName: [null],
    });
  }
  ClosePopUp(data: Users) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.formValid()) {
      this.usersService.registerUserHealthFacility(this.getValue()).subscribe({
        next: (retVal) => {
        },
        error: (err) => {
          console.log(err);
          this.toastService.showError(err.error.messages);
        },
        complete: () => {
          this.toastService.showSuccess(
            'User health facility tagged successfully!'
          );
          this.loaddata();
          // this.ref.close(this.userpermissions);
        },
      });
    }
  }
  formValid(): boolean {
    let str = '';
    let rhu = this.userhealthfacility.filter(
      (x) =>
        x.healthFacilityId ==
        this.usersHealthFacilityForm.controls['healthFacilityName'].value.id
    );
    if (rhu != undefined && rhu.length > 0) {
      let department = rhu.filter(
        (x) =>
          x.departmentId ==
          this.usersHealthFacilityForm.controls['departmentName'].value.id
      );
      if (department != undefined && department.length > 0) {
        let section = department.filter(
          (x) =>
            x.sectionId ==
            this.usersHealthFacilityForm.controls['sectionName'].value.id
        );
        if (section != undefined && section.length > 0) {
          str += 'User health facility already exist.';
        } else {
          this.pushdata();
        }
      } else {
        let rhudepartment = this.userhealthfacility.find(
          (x) =>
            x.healthFacilityId ==
            this.usersHealthFacilityForm.controls['healthFacilityName'].value.id
        );
        if (rhudepartment != undefined) {
          if (rhudepartment.departmentId > 0) {
            if (
              this.usersHealthFacilityForm.controls['departmentName'].value.id >
              0
            ) {
              this.pushdata();
            } else {
              str +=
                'Conflict in department accessibility, please remove the existing setup having the same healthfacility.';
            }
          } else {
            if (
              this.usersHealthFacilityForm.controls['departmentName'].value.id >
              0
            ) {
              str +=
                'Conflict in department accessibility, please remove the existing setup having the same healthfacility.';
            }
          }
        }
      }
    } else {
      this.pushdata();
    }
    if (str != '') {
      this.toastService.showError(str);
      return false;
    }
    return true;
  }
  updateData(userhealthfacility:UserHealthFacility) {
    let hfacility = this.heathfacilitylist.find(x=>x.id == userhealthfacility.healthFacilityId);
    let dep = this.departmentlist.find(x=>x.id == userhealthfacility.departmentId);
    let sec = this.sectionlist.find(x=>x.id == userhealthfacility.sectionId);
    this.healthfacility?.patchValue(hfacility);
    this.department?.patchValue(hfacility);
    this.section?.patchValue(hfacility);
  }
  removeData(userhealthfacility:UserHealthFacility) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this user health facility tagging?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       var data = this.userhealthfacility.filter(x=>x.healthFacilityId==userhealthfacility.healthFacilityId && x.departmentId == userhealthfacility.departmentId && x.sectionId == userhealthfacility.sectionId);
        if(data.length>0)
        {
          data.forEach(val=>{
            val.status = false;
          })
        }
        this.usersService.registerUserHealthFacility(this.getValue()).subscribe({
         next:(retVal)=>{
           if(retVal){
            this.toastService.showSuccess('User health facility tagging removed successfully.');
           }
        
         },
         complete:()=>{
          this.loaddata()
         }
       })
    }});
  }
  getValue(): UserHealthFacility[] {   
    return this.userhealthfacility;
  }
  loaddata() {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.healthFacilityService.getHealthFacility().subscribe({
      next: (result: HealthFacility[]) => {
        this.heathfacilitylist = result;
        this.healthfacility?.patchValue(
          this.heathfacilitylist.find((x) => x.status)
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.departmentService
          .getDepartments(
            '',
            '',
            this.usersHealthFacilityForm.controls['healthFacilityName'].value
              .id,
            0,
            100
          )
          .subscribe({
            next: (result: Department[]) => {
              this.departmentlist = result;
              this.departmentlist.push({
                id: 0,
                code: 'None',
                description: 'None',
                healthFacilityId: 0,
                healthFacilityCode: 'None',
                status: true,
                createdBy: '',
                createdDateTime: new Date(),
                modifiedBy: '',
                modifiedDateTime: new Date(),
              });
              this.prevdepartmentlist = this.departmentlist.sort((a, b) => {
                if (b.id < a.id) return 1;
                if (b.id > a.id) return -1;
                return 0;
              });
              this.department?.patchValue(
                this.prevdepartmentlist.find((x) => x.status)
              );
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.sectionService
                .getSections(
                  '',
                  '',
                  this.usersHealthFacilityForm.controls['departmentName'].value
                    .id,
                  0,
                  100
                )
                .subscribe({
                  next: (result: Section[]) => {
                    this.sectionlist = result;
                    this.sectionlist.push({
                      id: 0,
                      code: 'None',
                      description: 'None',
                      status: true,
                      createdBy: '',
                      createdDateTime: new Date(),
                      modifiedBy: '',
                      modifiedDateTime: new Date(),
                      departmentID: 0,
                    });
                    this.prevsectionlist = this.sectionlist.sort((a, b) => {
                      if (b.id < a.id) return 1;
                      if (b.id > a.id) return -1;
                      return 0;
                    });
                    this.section?.patchValue(
                      this.prevsectionlist.find((x) => x.status)
                    );
                  },
                  error: (err) => {
                    console.log(err);
                  },
                  complete: () => {},
                });
            },
          });
      },
    });

    let list = this.usersService
      .getUserHealthFacility(this.config.data.users.id)
      .subscribe((retVal) => {
        this.userhealthfacility = retVal;
        this.prevuserhealthfacility = this.userhealthfacility.filter(
          (x) => x.status
        );
      });
  }
  selectHealthFacility(event: any) {

    this.departmentService
      .getDepartments(
        '',
        '',
        this.usersHealthFacilityForm.controls['healthFacilityName'].value.id,
        0,
        100
      )
      .subscribe({
        next: (result: Department[]) => {
          this.departmentlist = result;
          this.departmentlist.push({
            id: 0,
            code: 'None',
            description: 'None',
            healthFacilityId: 0,
            healthFacilityCode: 'None',
            status: true,
            createdBy: '',
            createdDateTime: new Date(),
            modifiedBy: '',
            modifiedDateTime: new Date(),
          });
          this.prevdepartmentlist = this.departmentlist.sort((a, b) => {
            if (b.id < a.id) return 1;
            if (b.id > a.id) return -1;
            return 0;
          });
          this.department?.patchValue(
            this.prevdepartmentlist.find((x) => x.status)
          );
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.sectionService
            .getSections(
              '',
              '',
              this.usersHealthFacilityForm.controls['departmentName'].value.id,
              0,
              100
            )
            .subscribe({
              next: (result: Section[]) => {
                this.sectionlist = result;
                this.sectionlist.push({
                  id: 0,
                  code: 'None',
                  description: 'None',
                  status: true,
                  createdBy: '',
                  createdDateTime: new Date(),
                  modifiedBy: '',
                  modifiedDateTime: new Date(),
                  departmentID: 0,
                });
                this.prevsectionlist = this.sectionlist.sort((a, b) => {
                  if (b.id < a.id) return 1;
                  if (b.id > a.id) return -1;
                  return 0;
                });
                this.section?.patchValue(
                  this.prevsectionlist.find((x) => x.status)
                );
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
        },
      });
  }
  selectDepartment(event: any) {
    this.sectionService
      .getSections(
        '',
        '',
        this.usersHealthFacilityForm.controls['departmentName'].value.id,
        0,
        100
      )
      .subscribe({
        next: (result: Section[]) => {
          this.sectionlist = result;
          this.sectionlist.push({
            id: 0,
            code: 'None',
            description: 'None',
            status: true,
            createdBy: '',
            createdDateTime: new Date(),
            modifiedBy: '',
            modifiedDateTime: new Date(),
            departmentID: 0,
          });
          this.prevsectionlist = this.sectionlist.sort((a, b) => {
            if (b.id < a.id) return 1;
            if (b.id > a.id) return -1;
            return 0;
          });
          this.section?.patchValue(this.prevsectionlist.find((x) => x.status));
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
  pushdata() {
    this.userhealthfacilityobj = new UserHealthFacility();
    this.userhealthfacilityobj.id = 0;
    this.userhealthfacilityobj.userId = this.config.data.users.id;
    this.userhealthfacilityobj.userFullName =
      this.config.data.users.fullName;
    this.userhealthfacilityobj.healthFacilityId = this.healthfacility?.value.id;
    this.userhealthfacilityobj.code = this.healthfacility?.value.code;
    this.userhealthfacilityobj.facilityAddress = this.healthfacility?.value.facilityAddress;
    this.userhealthfacilityobj.departmentId = this.department?.value.id;
    this.userhealthfacilityobj.departmentName =
      this.department?.value.description;
    this.userhealthfacilityobj.sectionId = this.section?.value.id;
    this.userhealthfacilityobj.sectionName = this.section?.value.description;
    this.userhealthfacilityobj.status = true;
    this.userhealthfacilityobj.healthFacilityName =
      this.healthfacility?.value.name;
    this.userhealthfacility.push(this.userhealthfacilityobj);
    this.prevuserhealthfacility = this.userhealthfacility.filter(
      (x) => x.status
    );
  }
  get healthfacility() {
    return this.usersHealthFacilityForm.get('healthFacilityName');
  }
  get department() {
    return this.usersHealthFacilityForm.get('departmentName');
  }
  get section() {
    return this.usersHealthFacilityForm.get('sectionName');
  }
}
