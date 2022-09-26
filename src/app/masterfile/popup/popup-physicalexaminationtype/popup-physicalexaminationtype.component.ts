import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationType } from 'src/app/models/physicalexaminationtype.model';
import { PhysicalExaminationTypeService } from 'src/app/services/physicalexaminationtype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-physicalexaminationtype',
  templateUrl: './popup-physicalexaminationtype.component.html',
  styleUrls: ['./popup-physicalexaminationtype.component.css']
})
export class PopupPhysicalexaminationtypeComponent implements OnInit {

  physicalExaminationTypeForm: FormGroup;
  formBuilder: FormBuilder;

  physicalExaminationType: PhysicalExaminationType;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private petService: PhysicalExaminationTypeService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.physicalExaminationType.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.physicalExaminationTypeForm.patchValue(this.config.data.physicalExaminationType)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.physicalExaminationTypeForm = this.formBuilder.group(
      {
        type: ['']
      });
  }

  ClosePopUp(data: PhysicalExaminationType) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.petService.GetPhysicalExaminationTypeByCode(this.physicalExaminationTypeForm.controls['type'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.type.toUpperCase() == this.physicalExaminationTypeForm.controls['type'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Type already Exist!');
        } else {
          this.petService.insert(this.getData()).subscribe({
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
    let data = this.config.data.physicalExaminationType;
    data.type = this.physicalExaminationTypeForm.controls['type'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.petService.update(data.id, data).subscribe({
        next: (result: PhysicalExaminationType) => {
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

  getData(): PhysicalExaminationType {
    this.physicalExaminationType = new PhysicalExaminationType();
    this.physicalExaminationType.type = this.physicalExaminationTypeForm.controls['type'].value;
    this.physicalExaminationType.createdBy = '';
    this.physicalExaminationType.createdDateTime = new Date();
    return this.physicalExaminationType;
  }

}
