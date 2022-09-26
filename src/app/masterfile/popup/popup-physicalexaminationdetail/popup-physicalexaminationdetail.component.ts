import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationDetail } from 'src/app/models/physicalexaminationdetail.model';
import { PhysicalExaminationDetailType } from 'src/app/models/physicalexaminationdetailtype.model';
import { PhysicalExaminationType } from 'src/app/models/physicalexaminationtype.model';
import { PhysicalExaminationDetailService } from 'src/app/services/physicalexaminationdetail.service';
import { PhysicalExaminationDetailTypeService } from 'src/app/services/physicalexaminationdetailtype.service';
import { PhysicalExaminationTypeService } from 'src/app/services/physicalexaminationtype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-physicalexaminationdetail',
  templateUrl: './popup-physicalexaminationdetail.component.html',
  styleUrls: ['./popup-physicalexaminationdetail.component.css']
})
export class PopupPhysicalexaminationdetailComponent implements OnInit {

  physicalExaminationDetailForm: FormGroup;
  formBuilder: FormBuilder;

  physicalExaminationDetail: PhysicalExaminationDetail;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  pedtList: PhysicalExaminationDetailType[];
  petList: PhysicalExaminationType[];

  selectedpedt: PhysicalExaminationDetailType;
  selectedpet: PhysicalExaminationType;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private pedService: PhysicalExaminationDetailService, private pedtService: PhysicalExaminationDetailTypeService,
    private petService: PhysicalExaminationTypeService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.isActiveStatus = this.config.data.physicalExaminationDetail.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.physicalExaminationDetailForm.patchValue(this.config.data.physicalExaminationDetail)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.physicalExaminationDetailForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        physicalExaminationTypeId: [''],
        physicalExaminationDetailTypeId: ['']

      });

    this.petService.get('', 0, 100).subscribe({
      next: (result: PhysicalExaminationType[]) => {
        this.petList = result;
        this.petList = this.petList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
      }
    });

  }

  ClosePopUp(data: PhysicalExaminationDetail) {
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
      this.pedService.GetPhysicalExaminationDetailByCode(this.physicalExaminationDetailForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.physicalExaminationDetailForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.pedService.insert(this.getData()).subscribe({
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
    let data = this.config.data.physicalExaminationDetail;
    data.code = this.physicalExaminationDetailForm.controls['code'].value;
    data.description = this.physicalExaminationDetailForm.controls['description'].value;
    data.physicalExaminationTypeId = this.selectedpet.id;
    data.physicalExaminationDetailTypeId = this.selectedpedt.id;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.pedService.update(data.id, data).subscribe({
        next: (result: PhysicalExaminationDetail) => {
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

  getData(): PhysicalExaminationDetail {
    this.physicalExaminationDetail = new PhysicalExaminationDetail();
    this.physicalExaminationDetail.code = this.physicalExaminationDetailForm.controls['code'].value;
    this.physicalExaminationDetail.description = this.physicalExaminationDetailForm.controls['description'].value;
    this.physicalExaminationDetail.physicalExaminationTypeId = this.selectedpet.id;
    this.physicalExaminationDetail.physicalExaminationDetailTypeId = this.selectedpedt.id;

    this.physicalExaminationDetail.createdBy = '';
    this.physicalExaminationDetail.createdDateTime = new Date();
    return this.physicalExaminationDetail;

  }

  changePEType() {
    this.pedtService.get(this.selectedpet.id, '', '', 0, 100).subscribe({
      next: (result: PhysicalExaminationDetailType[]) => {
        this.pedtList = result;
        this.pedtList = this.pedtList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('changePEType complete');
      }
    });

  }

}
