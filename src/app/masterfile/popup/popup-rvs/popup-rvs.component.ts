import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RVS } from 'src/app/models/rvs.model';
import { SpecialProcedure } from 'src/app/models/specialProcedure.model';
import { RVSService } from 'src/app/services/rvs.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-rvs',
  templateUrl: './popup-rvs.component.html',
  styleUrls: ['./popup-rvs.component.css']
})
export class PopupRvsComponent implements OnInit {

  rvsForm: FormGroup;
  formBuilder: FormBuilder;
  rvs: RVS;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  specialProcedures: SpecialProcedure[];

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private rvsService: RVSService, private toastService: ToastService) {

    this.specialProcedures = [
      { name: 'LINAC', code: 'NY' },
      { name: 'HEMODIALYSIS', code: 'RM' },
      { name: 'PERITONEAL', code: 'LDN' },
      { name: 'BRACHYTHERAPHY', code: 'IST' },
      { name: 'CHEMOTHERAPY', code: 'PRS' }
    ];
  }

  ngOnInit(): void {

    this.isActiveStatus = this.config.data.rvs.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.rvsForm.patchValue(this.config.data.rvs)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.rvsForm = this.formBuilder.group(
      {
        code: [''],
        category: [''],
        description: [''],
        caseRateAmount: null,
        hospitalFee: null,
        professionalFee: null,
        caseRateAmount2: null,
        hospitalFee2: null,
        professionalFee2: null,
        allowSingleConfinement: [''],
        noOfDays: null,
        specialProcedure: [''],
        procedureType: null,
      });
  }

  get rvsControl(): { [key: string]: AbstractControl } {
    return this.rvsForm.controls;
  }

  ClosePopUp(data: RVS) {
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
      this.rvsService.GetRVSByCode(this.rvsForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.rvsForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.disableButton = true;
          this.rvsService.insert(this.getData()).subscribe({
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
    let data = this.config.data.rvs;
    data.category = this.rvsForm.controls['category'].value;
    data.code = this.rvsForm.controls['code'].value;
    data.description = this.rvsForm.controls['description'].value;
    data.caseRateAmount = this.rvsForm.controls['caseRateAmount'].value;
    data.hospitalFee = this.rvsForm.controls['hospitalFee'].value;
    data.professionalFee = this.rvsForm.controls['professionalFee'].value;
    data.caseRateAmount2 = this.rvsForm.controls['caseRateAmount2'].value;
    data.hospitalFee2 = this.rvsForm.controls['hospitalFee2'].value;
    data.professionalFee2 = this.rvsForm.controls['professionalFee2'].value;
    data.specialProcedure = this.rvsForm.controls['specialProcedure'].value;
    data.procedureType = this.rvsForm.controls['procedureType'].value;
    data.allowSingleConfinement = this.rvsForm.controls['allowSingleConfinement'].value;
    data.noOfDays = this.rvsForm.controls['noOfDays'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();

    if (this.isForUpdating) {
      this.rvsService.update(data.id, data).subscribe({
        next: (result: RVS) => {
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

  }

  getData(): RVS {
    this.rvs = new RVS();
    this.rvs.category = this.rvsForm.controls['category'].value;
    this.rvs.code = this.rvsForm.controls['code'].value;
    this.rvs.description = this.rvsForm.controls['description'].value;
    this.rvs.caseRateAmount = this.rvsForm.controls['caseRateAmount'].value;
    this.rvs.hospitalFee = this.rvsForm.controls['hospitalFee'].value;
    this.rvs.professionalFee = this.rvsForm.controls['professionalFee'].value;
    this.rvs.caseRateAmount2 = this.rvsForm.controls['caseRateAmount2'].value;
    this.rvs.hospitalFee2 = this.rvsForm.controls['hospitalFee2'].value;
    this.rvs.professionalFee2 = this.rvsForm.controls['professionalFee2'].value;
    this.rvs.specialProcedure = this.rvsForm.controls['specialProcedure'].value;
    this.rvs.procedureType = this.rvsForm.controls['procedureType'].value;
    this.rvs.allowSingleConfinement = this.rvsForm.controls['allowSingleConfinement'].value;
    this.rvs.noOfDays = this.rvsForm.controls['noOfDays'].value;
    this.rvs.createdBy = '';
    this.rvs.createdDateTime = new Date();
    return this.rvs;
  }


  setValues() {
    //this.rvsControl.procedureType.setValue("");
  }
}
