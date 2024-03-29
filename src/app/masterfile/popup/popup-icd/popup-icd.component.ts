import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICD10 } from 'src/app/models/icd10.model';
import { ICD10Service } from 'src/app/services/icd10.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-icd',
  templateUrl: './popup-icd.component.html',
  styleUrls: ['./popup-icd.component.css']
})
export class PopupIcdComponent implements OnInit {

  icd10Form: FormGroup;
  formBuilder: FormBuilder;
  icd10: ICD10;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private icd10Service: ICD10Service, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.icd10Form.patchValue(this.config.data.icd)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.icd10Form = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        caseRateAmount: null,
        hospitalFee: null,
        professionalFee: null,
        caseRateAmount2: null,
        hospitalFee2: null,
        professionalFee2: null,
        allowSingleConfinement: [''],
        noOfDays: null,
      });
  }

  ClosePopUp(data: ICD10) {
    console.log(this.ref);
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.icd10Service.GetICDByCode(this.icd10Form.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.icd10Form.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.disableButton = true;
          this.icd10Service.insert(this.getData()).subscribe({
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
    let data = this.config.data.icd;
    data.code = this.icd10Form.controls['code'].value;
    data.description = this.icd10Form.controls['description'].value;
    data.caseRateAmount = this.icd10Form.controls['caseRateAmount'].value;
    data.hospitalFee = this.icd10Form.controls['hospitalFee'].value;
    data.professionalFee = this.icd10Form.controls['professionalFee'].value;
    data.caseRateAmount2 = this.icd10Form.controls['caseRateAmount2'].value;
    data.hospitalFee2 = this.icd10Form.controls['hospitalFee2'].value;
    data.professionalFee2 = this.icd10Form.controls['professionalFee2'].value;
    data.allowSingleConfinement = this.icd10Form.controls['allowSingleConfinement'].value;
    data.noOfDays = this.icd10Form.controls['noOfDays'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();

    if (this.isForUpdating) {
      this.icd10Service.update(data.id, data).subscribe({
        next: (result: ICD10) => {
          data = result;
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
    console.log(data);
  }

  getData(): ICD10 {
    this.icd10 = new ICD10();
    this.icd10.code = this.icd10Form.controls['code'].value;
    this.icd10.description = this.icd10Form.controls['description'].value;
    this.icd10.caseRateAmount = this.icd10Form.controls['caseRateAmount'].value;
    this.icd10.hospitalFee = this.icd10Form.controls['hospitalFee'].value;
    this.icd10.professionalFee = this.icd10Form.controls['professionalFee'].value;
    this.icd10.caseRateAmount2 = this.icd10Form.controls['caseRateAmount2'].value;
    this.icd10.hospitalFee2 = this.icd10Form.controls['hospitalFee2'].value;
    this.icd10.professionalFee2 = this.icd10Form.controls['professionalFee2'].value;
    this.icd10.allowSingleConfinement = this.icd10Form.controls['allowSingleConfinement'].value;
    this.icd10.noOfDays = this.icd10Form.controls['noOfDays'].value;
    this.icd10.createdBy = '';
    this.icd10.createdDateTime = new Date();
    return this.icd10;
  }
}
