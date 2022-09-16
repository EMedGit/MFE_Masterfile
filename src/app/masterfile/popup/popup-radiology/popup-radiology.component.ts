import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Radiology } from 'src/app/models/radiology.model';
import { RadiologyService } from 'src/app/services/radiology.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-radiology',
  templateUrl: './popup-radiology.component.html',
  styleUrls: ['./popup-radiology.component.css']
})
export class PopupRadiologyComponent implements OnInit {
  radiology: Radiology;
  radiologyForm: FormGroup;
  formBuilder: FormBuilder;
  arrRadiology: Radiology[] = [];
  radiologyList: Radiology[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private radiologyService: RadiologyService, private datePipe: DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.radiologyForm.patchValue(this.config.data.radiology);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.radiologyForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        price: [''],
        highestPrice: [''],
        lowestPrice: [''],
        priceReferenceIndex: [''],
        diagnosisRemarks: [''],
        departmentCode: [''],
        specializationCode: ['']
      });
  }
  ClosePopUp(data: Radiology) {
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.radiologyService.GetRadiologyByCode(this.radiologyForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.radiologyForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.radiologyService.postRadiology(this.getValue()).subscribe(result => { this.ClosePopUp(result); });
        }
      });
    }
  }
  updateData() {
    let data = this.config.data.radiology;
    let obj = new Radiology();
    obj.code = this.radiologyForm.controls['code'].value;
    obj.description = this.radiologyForm.controls['description'].value;
    obj.price = this.radiologyForm.controls['price'].value;
    obj.highestPrice = this.radiologyForm.controls['highestPrice'].value;
    obj.lowestPrice = this.radiologyForm.controls['lowestPrice'].value;
    obj.priceReferenceIndex = this.radiologyForm.controls['priceReferenceIndex'].value;
    obj.diagnosisRemarks = this.radiologyForm.controls['diagnosisRemarks'].value;
    obj.departmentCode = this.radiologyForm.controls['departmentCode'].value;
    obj.specializationCode = this.radiologyForm.controls['specializationCode'].value;
    obj.modifiedBy = 'Fox';
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.radiologyService.putRadiology(data.id, obj).subscribe({
        next: (result: Radiology) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
  }
  getValue(): Radiology {
    this.radiology = new Radiology();
    this.radiology.createdBy = 'admin';
    this.radiology.code = this.radiologyForm.controls['code'].value;
    this.radiology.description = this.radiologyForm.controls['description'].value;
    this.radiology.price = this.radiologyForm.controls['price'].value;
    this.radiology.highestPrice = this.radiologyForm.controls['highestPrice'].value;
    this.radiology.lowestPrice = this.radiologyForm.controls['lowestPrice'].value;
    this.radiology.priceReferenceIndex = this.radiologyForm.controls['priceReferenceIndex'].value;
    this.radiology.diagnosisRemarks = this.radiologyForm.controls['diagnosisRemarks'].value;
    this.radiology.departmentCode = this.radiologyForm.controls['departmentCode'].value;
    this.radiology.specializationCode = this.radiologyForm.controls['specializationCode'].value;
    return this.radiology;
  }
}
