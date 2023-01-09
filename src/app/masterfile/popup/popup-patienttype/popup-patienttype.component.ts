import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { PatientType } from 'src/app/models/patienttype.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { PatienttypeService } from 'src/app/services/patienttype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-patienttype',
  templateUrl: './popup-patienttype.component.html',
  styleUrls: ['./popup-patienttype.component.css']
})
export class PopupPatienttypeComponent implements OnInit {

  healthfacility: HealthFacility;
  healthFacilityList: HealthFacility[];
  patienttypeForm: FormGroup;
  formBuilder: FormBuilder;
  patienttype: PatientType;
  arrPatientType: PatientType[] = [];
  patienttypeList: PatientType[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private patienttypeService: PatienttypeService,
    private datePipe: DatePipe,
    private healthfacilityServices: HealthFacilityService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.patienttypeForm.patchValue(this.config.data.patienttype);
    // this.patienttypeForm.get("selectedHealthFacilityName")?.setValue(this.healthFacilityList.find(x => x.name));
    this.loadData();
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.patienttypeForm = this.formBuilder.group(
      {
        description: ['']
      });
  }

  loadData(): void {
    this.healthfacilityServices.getHealthFacility().subscribe(retval => {
      return this.healthFacilityList = retval;
    });
  }

  ClosePopUp(data: PatientType) {
    this.ref.close(data);
  }
  selectedItem(event: any) {
    this.healthfacility = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.patienttypeService.GetPatientTypeByCode(this.patienttypeForm.controls['description'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.description.toUpperCase() == this.patienttypeForm.controls['description'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Description already Exist!');
        } else {
          this.disableButton = true;
          this.patienttypeService.postPatientType(this.getValue()).subscribe({
            next: result => {
              this.ClosePopUp(result);
            }, error: (err) => {
              this.toastService.showError(err.error.messages);
            }, complete: () => {
              this.toastService.showSuccess('Successfully Saved.');
            }
          });
        }
      });
    }
  }
  updateData() {
    let data = this.config.data.patienttype;
    let obj = new PatientType();
    if (this.healthfacility == undefined) {
      let x = this.healthFacilityList.find(x => x.id);
      obj.healthFacilityId = x?.id
      obj.healthFacilityCode = x?.code;
      obj.healthFacilityName = x?.name;
    } else {
      obj.healthFacilityId = this.healthfacility.id;
      obj.healthFacilityCode = this.healthfacility.code;
      obj.healthFacilityName = this.healthfacility.name;
    }

    obj.description = this.patienttypeForm.controls['description'].value;
    obj.createdDateTime = data.createdDateTime;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    console.log('start', obj);
    if (this.isForUpdating) {

      this.patienttypeService.putPatientType(data.id, obj).subscribe({
        next: (result: PatientType) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          this.toastService.showError(err.error.messages);
        },
        complete: () => {
          this.toastService.showSuccess('Successfully Updated.');
        }
      });
    }
  }
  getValue(): PatientType {
    this.patienttype = new PatientType();
    if (this.healthfacility == undefined) {
      let x = this.healthFacilityList.find(x => x.id);
      this.patienttype.healthFacilityId = x?.id;
      this.patienttype.healthFacilityCode = x?.code;
      this.patienttype.healthFacilityName = x?.name;
    } else {
      this.patienttype.healthFacilityId = this.healthfacility.id;
      this.patienttype.healthFacilityCode = this.healthfacility.code;
      this.patienttype.healthFacilityName = this.healthfacility.name;
    }
    this.patienttype.description = this.patienttypeForm.controls['description'].value;
    return this.patienttype;
  }
}
