import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    private sectionService: SectionService
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
    // this.usersService.addupdateuserclaims(this.getValue()).subscribe({
    //   next: (retVal) => {},
    //   error: (err) => {
    //     console.log(err);
    //     this.toastService.showError(err.error.messages);
    //   },
    //   complete: () => {
    //     this.toastService.showSuccess('User permission saved successfully!');
    //     // this.ref.close(this.userpermissions);
    //   },
    // });
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
  getValue(): UserHealthFacility {
    return new UserHealthFacility();
  }
  loaddata() {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.healthFacilityService.getHealthFacility('', '', 0, 100).subscribe({
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
        console.log(
          this.usersHealthFacilityForm.controls['healthFacilityName'].value.id
        );
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
                    this.prevsectionlist = this.sectionlist.sort(
                      (a, b) => {
                        if (b.id < a.id) return 1;
                        if (b.id > a.id) return -1;
                        return 0;
                      }
                    );
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
                this.prevsectionlist = this.sectionlist.sort(
                  (a, b) => {
                    if (b.id < a.id) return 1;
                    if (b.id > a.id) return -1;
                    return 0;
                  }
                );
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
        this.prevsectionlist = this.sectionlist.sort(
          (a, b) => {
            if (b.id < a.id) return 1;
            if (b.id > a.id) return -1;
            return 0;
          }
        );
        this.section?.patchValue(
          this.prevsectionlist.find((x) => x.status)
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
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
