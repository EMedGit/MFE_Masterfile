import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChiefComplaint } from 'src/app/models/chiefcomplaint.model';
import { ChiefcomplaintService } from 'src/app/services/chiefcomplaint.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-chiefcomplaint',
  templateUrl: './popup-chiefcomplaint.component.html',
  styleUrls: ['./popup-chiefcomplaint.component.css']
})
export class PopupChiefcomplaintComponent implements OnInit {

  chiefcomplaintForm: FormGroup;
  formBuilder: FormBuilder;
  chiefcomplaint: ChiefComplaint;
  arrChiefComplaint: ChiefComplaint[] = [];
  chiefcomplaintList: ChiefComplaint[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private chiefcomplaintService: ChiefcomplaintService, private datePipe: DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.chiefcomplaintForm.patchValue(this.config.data.chiefcomplaint);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.chiefcomplaintForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data: ChiefComplaint) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.chiefcomplaintService.GetChiefComplaintByCode(this.chiefcomplaintForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.chiefcomplaintForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.chiefcomplaintService.postChiefcomplaint(this.getValue()).subscribe({
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
    let data = this.config.data.chiefcomplaint;
    let obj = new ChiefComplaint();
    obj.code = this.chiefcomplaintForm.controls['code'].value;
    obj.description = this.chiefcomplaintForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.chiefcomplaintService.putChiefcomplaint(data.id, obj).subscribe({
        next: (result: ChiefComplaint) => {
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
  getValue(): ChiefComplaint {
    this.chiefcomplaint = new ChiefComplaint();
    this.chiefcomplaint.code = this.chiefcomplaintForm.controls['code'].value;
    this.chiefcomplaint.description = this.chiefcomplaintForm.controls['description'].value;
    return this.chiefcomplaint;
  }
}
