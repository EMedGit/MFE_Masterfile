import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImmunizationType } from 'src/app/models/immunizationtype.model';
import { ImmunizationTypeService } from 'src/app/services/immunizationtype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-immunizationtype',
  templateUrl: './popup-immunizationtype.component.html',
  styleUrls: ['./popup-immunizationtype.component.css']
})
export class PopupImmunizationtypeComponent implements OnInit {

  immunizationTypeForm: FormGroup;
  formBuilder: FormBuilder;

  immunizationType: ImmunizationType;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private itService: ImmunizationTypeService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.immunizationTypeForm.patchValue(this.config.data.immunizationType);
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.immunizationTypeForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }

  ClosePopUp(data: ImmunizationType) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.itService.GetImmunizationTypeByCode(this.immunizationTypeForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.immunizationTypeForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.disableButton = true;
          this.itService.insert(this.getData()).subscribe({
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

  getData(): ImmunizationType {
    this.immunizationType = new ImmunizationType();
    this.immunizationType.code = this.immunizationTypeForm.controls['code'].value;
    this.immunizationType.description = this.immunizationTypeForm.controls['description'].value;
    this.immunizationType.createdBy = '';
    this.immunizationType.createdDateTime = new Date();
    return this.immunizationType;
  }

  updateData() {
    let data = this.config.data.immunizationType;
    data.code = this.immunizationTypeForm.controls['code'].value;
    data.description = this.immunizationTypeForm.controls['description'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.itService.update(data.id, data).subscribe({
        next: (result: ImmunizationType) => {
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

}
