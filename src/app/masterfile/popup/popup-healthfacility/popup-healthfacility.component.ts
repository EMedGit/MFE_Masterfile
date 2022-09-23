import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { BulkUserHealthFacility, UserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-popup-healthfacility',
  templateUrl: './popup-healthfacility.component.html',
  styleUrls: ['./popup-healthfacility.component.css']
})
export class PopupHealthfacilityComponent implements OnInit {

  healthFacilityForm: FormGroup;
  formBuilder: FormBuilder;

  healthFacility: HealthFacility;
  bulkUserHealthFacility: BulkUserHealthFacility;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private healthFacilityService: HealthFacilityService,
    private usersService: UsersService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.buildFormGroup();
    this.healthFacilityForm.patchValue(this.config.data.healthFacility)
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.healthFacilityForm = this.formBuilder.group(
      {
        code: [''],
        name: [''],
        facilityAddress: ['']
      });

  }
  ClosePopUp(data: HealthFacility) {
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.healthFacilityService.GetHealthFacilityByHealthFacilityCode(this.healthFacilityForm.controls['code'].value).subscribe(retVal => {
        if (retVal)
          this.healthFacilityService.insert(this.getData()).subscribe({
            next: result => {
              this.ClosePopUp(result);
            }, error: (err) => {
              this.toastService.showError(err.error.messages);
            }, complete: () => {
              this.toastService.showSuccess('Successfully Saved.');
            }
          });
      })
    }
  }
  updateData() {
    let data = this.config.data.healthFacility;
    let obj = new HealthFacility();
    obj.code = this.healthFacilityForm.controls['code'].value;
    obj.name = this.healthFacilityForm.controls['name'].value;
    obj.facilityAddress = this.healthFacilityForm.controls['facilityAddress'].value;
    obj.modifiedBy = '';
    obj.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.healthFacilityService.update(data.id, obj).subscribe({
        next: (result: HealthFacility) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.usersService.bulkUpdateUserHealthFacility(this.getUserHealthFacility()).subscribe({
            next: (retVal) => {
            }, error: (err) => {
              this.toastService.showError(err.error.messages);
            }, complete: () => {
              this.toastService.showSuccess('Successfully Updated.');
            }
          });
        }
      });
    }
  }
  getUserHealthFacility(): BulkUserHealthFacility {
    let data = this.config.data.healthFacility;
    this.bulkUserHealthFacility = new BulkUserHealthFacility();
    this.bulkUserHealthFacility.healthFacilityId = data.id;
    this.bulkUserHealthFacility.code = this.healthFacilityForm.controls['code'].value;
    this.bulkUserHealthFacility.healthFacilityName = this.healthFacilityForm.controls['name'].value;
    this.bulkUserHealthFacility.facilityAddress = this.healthFacilityForm.controls['facilityAddress'].value;
    this.bulkUserHealthFacility.type = 'HealthFacility';
    return this.bulkUserHealthFacility;
  }
  getData(): HealthFacility {
    this.healthFacility = new HealthFacility();
    this.healthFacility.code = this.healthFacilityForm.controls['code'].value;
    this.healthFacility.name = this.healthFacilityForm.controls['name'].value;
    this.healthFacility.facilityAddress = this.healthFacilityForm.controls['facilityAddress'].value
    this.healthFacility.createdBy = '';
    this.healthFacility.createdDateTime = new Date();
    return this.healthFacility;
  }
}
