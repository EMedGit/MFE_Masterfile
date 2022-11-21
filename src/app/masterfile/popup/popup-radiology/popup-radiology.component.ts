import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillaryDepartment } from 'src/app/models/ancillarydepartment.model';
import { AncillarySection } from 'src/app/models/ancillarysection.model';
import { Radiology } from 'src/app/models/radiology.model';
import { AncillarydepartmentService } from 'src/app/services/ancillarydepartment.service';
import { AncillarysectionService } from 'src/app/services/ancillarysection.service';
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
  ancillarydepartment: AncillaryDepartment[];
  ancillarysection: AncillarySection[];
  specializationCode: string;
  departmentCode: string;
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  constructor(private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig, 
    private ancillarydepartmentService: AncillarydepartmentService,
    private ancillarysectionService: AncillarysectionService,
    private radiologyService: RadiologyService, 
    private datePipe: DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.radiologyForm.patchValue(this.config.data.radiology);
    this.loadData();
    this.onValueChanges();
  }
  loadData() : void {
    this.ancillarydepartmentService.getAncillaryDepartment().subscribe(retVal => { this.ancillarydepartment = retVal; });
    this.ancillarysectionService.getAncillarySection().subscribe(retVal => { this.ancillarysection = retVal; });
  }
  onValueChanges(): void {
    this.radiologyForm.valueChanges.subscribe(value => {
      value.departmentCode = this.ancillarydepartment.find(t => t.id == value.ancillaryDepartmentId)?.code ?? null;
      value.specializationCode = this.ancillarysection.find(t => t.ancillaryDepartmentId == value.ancillaryDepartmentId)?.code ?? null;
      this.departmentCode = value.departmentCode;
      this.specializationCode = value.specializationCode;
      this.setValueChanges();
    });
  }
  setValueChanges(): void {
    this.radiologyForm.get('ancillaryDepartmentId')?.valueChanges.subscribe(ancillaryDeptID => {
      if (ancillaryDeptID == null) {
        this.radiologyForm.patchValue({
          ancillaryDepartmentId: null,
          ancillarySectionId: null
        });
        this.ancillarydepartment = [];
        this.ancillarysection = [];
        return;
      }
      this.ancillarysectionService.GetAncillarySectionByAncillaryDepartmentId(ancillaryDeptID).subscribe(retVal => {
        this.ancillarysection = retVal;
      })
    });
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
        ancillaryDepartmentId: null,
        ancillarySectionId: null,
        activeInactiveStatus: ['']
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
          this.radiologyService.postRadiology(this.getValue()).subscribe({
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
    let data = this.config.data.radiology;
    let obj = new Radiology();
    obj.code = this.radiologyForm.controls['code'].value;
    obj.description = this.radiologyForm.controls['description'].value;
    obj.price = this.radiologyForm.controls['price'].value;
    obj.highestPrice = this.radiologyForm.controls['highestPrice'].value;
    obj.lowestPrice = this.radiologyForm.controls['lowestPrice'].value;
    obj.priceReferenceIndex = this.radiologyForm.controls['priceReferenceIndex'].value;
    obj.diagnosisRemarks = this.radiologyForm.controls['diagnosisRemarks'].value;
    obj.departmentCode = this.departmentCode ?? "";
    obj.specializationCode = this.specializationCode ?? "";
    obj.ancillaryDepartmentId = this.radiologyForm.controls['ancillaryDepartmentId'].value;
    obj.ancillarySectionId = this.radiologyForm.controls['ancillarySectionId'].value;
    obj.activeInactiveStatus = this.radiologyForm.controls['activeInactiveStatus'].value;
    obj.classificationId = 2;
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
          this.toastService.showError(err.error.messages);
        },
        complete: () => {
          this.toastService.showSuccess('Successfully Updated.');
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
    this.radiology.departmentCode = this.departmentCode ?? "";
    this.radiology.specializationCode = this.specializationCode ?? "";
    this.radiology.ancillaryDepartmentId = this.radiologyForm.controls['ancillaryDepartmentId'].value;
    this.radiology.ancillarySectionId = this.radiologyForm.controls['ancillarySectionId'].value;
    this.radiology.activeInactiveStatus = this.radiologyForm.controls['activeInactiveStatus'].value;
    this.radiology.classificationId = 2;
    return this.radiology;
  }
}
