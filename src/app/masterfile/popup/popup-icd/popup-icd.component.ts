import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICD10 } from 'src/app/models/masterfile.model';

@Component({
  selector: 'app-popup-icd',
  templateUrl: './popup-icd.component.html',
  styleUrls: ['./popup-icd.component.css']
})
export class PopupIcdComponent implements OnInit {

  icd10Form: FormGroup;
  formBuilder: FormBuilder;
  ref: DynamicDialogRef;
  icd10: ICD10;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private dialogService: DialogService, private config: DynamicDialogConfig) { }

  ngOnInit(): void {

    this.isActiveStatus = this.config.data.icd.status;
    this.isForUpdating= this.config.data.isForUpdating;
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
        secondCaseRateAmount: null,
        secondHospitalFee: null,
        secondProfessionalFee: null,
        allowSingleConfinement: false,
        noOfDays: null
      });
  }
  
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
