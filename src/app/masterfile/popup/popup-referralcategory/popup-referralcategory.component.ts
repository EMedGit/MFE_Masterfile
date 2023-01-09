import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReferralCategory } from 'src/app/models/referralcategory.model';
import { ReferralcategoryService } from 'src/app/services/referralcategory.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-referralcategory',
  templateUrl: './popup-referralcategory.component.html',
  styleUrls: ['./popup-referralcategory.component.css']
})
export class PopupReferralcategoryComponent implements OnInit {

  referralcategoryForm: FormGroup;
  formBuilder: FormBuilder;
  referralcategory: ReferralCategory;
  arrReferralCategory: ReferralCategory[] = [];
  referralcategoryList: ReferralCategory[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private referralcategoryService: ReferralcategoryService,
    private datePipe: DatePipe,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.referralcategoryForm.patchValue(this.config.data.referralcategory);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.referralcategoryForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data: ReferralCategory) {
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.referralcategoryService.GetReferralCategoryByCode(this.referralcategoryForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.referralcategoryForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.disableButton = true;
          this.referralcategoryService.postReferralcategory(this.getValue()).subscribe({
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
    let data = this.config.data.referralcategory;
    let obj = new ReferralCategory();
    obj.code = this.referralcategoryForm.controls['code'].value;
    obj.description = this.referralcategoryForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.referralcategoryService.putReferralcategory(data.id, obj).subscribe({
        next: (result: ReferralCategory) => {
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
  getValue(): ReferralCategory {
    this.referralcategory = new ReferralCategory();
    this.referralcategory.code = this.referralcategoryForm.controls['code'].value;
    this.referralcategory.description = this.referralcategoryForm.controls['description'].value;
    return this.referralcategory;
  }
}
