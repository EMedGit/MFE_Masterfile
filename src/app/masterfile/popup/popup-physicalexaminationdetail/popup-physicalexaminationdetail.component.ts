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

  physicalexaminationdetailtype: PhysicalExaminationDetailType[];
  physicalexaminationtype: PhysicalExaminationType[];

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private pedService: PhysicalExaminationDetailService, private pedtService: PhysicalExaminationDetailTypeService,
    private petService: PhysicalExaminationTypeService,
    private toastService: ToastService) { }
  ngOnInit(): void {
    // this.isActiveStatus = this.config.data.physicalExaminationDetail.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.buildFormGroup();
    this.physicalExaminationDetailForm.patchValue(this.config.data.physicalExaminationDetail)
    this.loadData();
    this.onValueChanges();
   
  }
  loadData(): void {
    this.pedtService.get().subscribe(retVal => { this.physicalexaminationdetailtype = retVal; });
    this.petService.get().subscribe(retVal => { this.physicalexaminationtype = retVal; });
  }
  onValueChanges(): void {
    this.physicalExaminationDetailForm.valueChanges.subscribe(value => {
      console.log(value,'test')
      value.physicalExaminationDetailTypeId = this.physicalexaminationdetailtype.find(t => t.physicalExaminationTypeId == value.physicalExaminationTypeId)?.id ?? null;
      this.setValueChanges();
    });
  }
  setValueChanges(): void {
    this.physicalExaminationDetailForm.get('physicalExaminationTypeId')?.valueChanges.subscribe(physicalExaminationTypeId => {
      if(physicalExaminationTypeId == null) {
        this.physicalExaminationDetailForm.patchValue({
          physicalExaminationTypeId: null,
          physicalExaminationDetailTypeId: null
        });
        this.physicalexaminationtype = [];
        this.physicalexaminationdetailtype = [];
        return;
      }
      this.pedtService.getPhysicalExaminationDetailTypeById(physicalExaminationTypeId).subscribe(retVal => {
        this.physicalexaminationdetailtype = retVal;
      });
    });
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.physicalExaminationDetailForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        physicalExaminationTypeId: null,
        physicalExaminationDetailTypeId: null
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
    data.physicalExaminationTypeId = this.physicalExaminationDetailForm.controls['physicalExaminationTypeId'].value;
    data.physicalExaminationDetailTypeId = this.physicalExaminationDetailForm.controls['physicalExaminationDetailTypeId'].value;
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
    this.physicalExaminationDetail.physicalExaminationTypeId = this.physicalExaminationDetailForm.controls['physicalExaminationTypeId'].value;
    this.physicalExaminationDetail.physicalExaminationDetailTypeId = this.physicalExaminationDetailForm.controls['physicalExaminationDetailTypeId'].value;
    this.physicalExaminationDetail.createdBy = '';
    this.physicalExaminationDetail.createdDateTime = new Date();
    return this.physicalExaminationDetail;

  }
}
