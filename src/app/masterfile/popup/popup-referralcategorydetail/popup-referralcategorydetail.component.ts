import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReferralCategory } from 'src/app/models/referralcategory.model';
import { ReferralCategoryDetail } from 'src/app/models/referralcategorydetail.model';
import { ReferralcategoryService } from 'src/app/services/referralcategory.service';
import { ReferralcategorydetailService } from 'src/app/services/referralcategorydetail.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-referralcategorydetail',
  templateUrl: './popup-referralcategorydetail.component.html',
  styleUrls: ['./popup-referralcategorydetail.component.css']
})
export class PopupReferralcategorydetailComponent implements OnInit {

  referralcategory: ReferralCategory;
  referralcategoryList: ReferralCategory[];
  referralcategorydetailForm: FormGroup;
  formBuilder: FormBuilder;
  referralcategorydetail: ReferralCategoryDetail;
  arrReferralCategoryDetail: ReferralCategoryDetail[] = [];
  referralcategorydetailList: ReferralCategoryDetail[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private referralcategorydetailService: ReferralcategorydetailService,
    private datePipe: DatePipe,
    private referralcategoryService: ReferralcategoryService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.referralcategorydetailForm.patchValue(this.config.data.referralcategorydetail);
    this.loadData();
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.referralcategorydetailForm = this.formBuilder.group(
      {
        referralCategoryDescription: [''],
        condition: [''],
        indications: [''],
        category: ['']
      });
  }
  loadData(): void {
    this.referralcategoryService.getReferralcategory().subscribe(retval => {
      this.referralcategoryList = retval;
      console.log(this.referralcategoryList, 'yikes')
    });
  }
  ClosePopUp(data: ReferralCategoryDetail) {
    this.ref.close(data);
  }
  selectedItem(event: any) {
    this.referralcategory = event.value;
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.referralcategorydetailService.GetReferralCategoryDetailByDescription(this.referralcategorydetailForm.controls['referralCategoryDescription'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.referralCategoryDescription.toUpperCase() == this.referralcategorydetailForm.controls['referralCategoryDescription'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Referral Category Description already Exist!');
        } else {
          this.disableButton = true;
          this.referralcategorydetailService.postReferralcategorydetail(this.getValue()).subscribe({
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
    let data = this.config.data.referralcategorydetail;
    let obj = new ReferralCategoryDetail();
    if (this.referralcategory == undefined) {
      obj.referralCategoryId = data.id;
    } else {
      obj.referralCategoryId = this.referralcategory.id;
    }
    obj.referralCategoryDescription = this.referralcategorydetailForm.controls['referralCategoryDescription'].value;
    obj.condition = this.referralcategorydetailForm.controls['description'].value;
    obj.indications = this.referralcategorydetailForm.controls['description'].value;
    obj.category = this.referralcategorydetailForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.referralcategorydetailService.putReferralcategorydetail(data.id, obj).subscribe({
        next: (result: ReferralCategoryDetail) => {
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
  getValue(): ReferralCategoryDetail {
    this.referralcategorydetail = new ReferralCategoryDetail();
    if (this.referralcategory == undefined) {
      let x = this.referralcategoryList.find(x => x.id);
      this.referralcategorydetail.referralCategoryId = x?.id;

    } else {
      this.referralcategorydetail.referralCategoryId = this.referralcategory.id;
    }
    this.referralcategorydetail.referralCategoryDescription = this.referralcategorydetailForm.controls['referralCategoryDescription'].value;
    this.referralcategorydetail.condition = this.referralcategorydetailForm.controls['condition'].value;
    this.referralcategorydetail.indications = this.referralcategorydetailForm.controls['indications'].value;
    this.referralcategorydetail.category = this.referralcategorydetailForm.controls['category'].value;
    return this.referralcategorydetail;
  }
}
