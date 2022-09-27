import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillaryDepartment } from 'src/app/models/ancillarydepartment.model';
import { AncillarySection } from 'src/app/models/ancillarysection.model';
import { Laboratory } from 'src/app/models/laboratory.model';
import { AncillarydepartmentService } from 'src/app/services/ancillarydepartment.service';
import { AncillarysectionService } from 'src/app/services/ancillarysection.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-laboratory',
  templateUrl: './popup-laboratory.component.html',
  styleUrls: ['./popup-laboratory.component.css']
})
export class PopupLaboratoryComponent implements OnInit {

  laboratory: Laboratory;
  laboratoryForm: FormGroup;
  formBuilder: FormBuilder;
  arrLaboratory: Laboratory[] = [];
  laboratoryList: Laboratory[];
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
    private laboratoryService: LaboratoryService,
    private datePipe: DatePipe,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.laboratoryForm.patchValue(this.config.data.laboratory);
    this.loadData();
    this.onValueChanges();
  }

  loadData(): void {
    this.ancillarydepartmentService.getAncillaryDepartment().subscribe(retVal => { this.ancillarydepartment = retVal; });
    this.ancillarysectionService.getAncillarySection().subscribe(retVal => { this.ancillarysection = retVal; });
  }

  onValueChanges(): void {
    this.laboratoryForm.valueChanges.subscribe(value => {
      value.departmentCode = this.ancillarydepartment.find(t => t.id == value.ancillaryDepartmentId)?.code ?? null;
      value.specializationCode = this.ancillarysection.find(t => t.ancillaryDepartmentId == value.ancillaryDepartmentId)?.code ?? null;
      this.departmentCode = value.departmentCode;
      this.specializationCode = value.specializationCode;
      this.setValueChanges();
    });
  }
  setValueChanges(): void {

    this.laboratoryForm.get('ancillaryDepartmentId')?.valueChanges.subscribe(ancillaryDeptID => {
      if (ancillaryDeptID == null) {
        this.laboratoryForm.patchValue({
          ancillaryDepartmentId: null,
          ancillarySpecializationId: null
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
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.laboratoryForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        price: [''],
        highestPrice: [''],
        lowestPrice: [''],
        priceReferenceIndex: [''],
        diagnosisRemarks: [''],
        ancillaryDepartmentId: [''],
        ancillarySpecializationId: [''],
        activeInactiveStatus: ['']
      });
  }
  ClosePopUp(data: Laboratory) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.laboratoryService.GetLaboratoryByCode(this.laboratoryForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.laboratoryForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.laboratoryService.postLaboratory(this.getValue()).subscribe({
            next: result => {
              this.ClosePopUp(result);
            }, complete: () => {
              this.toastService.showSuccess('Successfully Updated.');
            }
          });
        }
      });
    }
  }
  updateData() {
    let data = this.config.data.laboratory;
    let obj = new Laboratory();
    obj.code = this.laboratoryForm.controls['code'].value;
    obj.description = this.laboratoryForm.controls['description'].value;
    obj.price = this.laboratoryForm.controls['price'].value;
    obj.highestPrice = this.laboratoryForm.controls['highestPrice'].value;
    obj.lowestPrice = this.laboratoryForm.controls['lowestPrice'].value;
    obj.priceReferenceIndex = this.laboratoryForm.controls['priceReferenceIndex'].value;
    obj.diagnosisRemarks = this.laboratoryForm.controls['diagnosisRemarks'].value;
    obj.departmentCode = this.departmentCode ?? "";
    obj.specializationCode = this.specializationCode ?? "";
    obj.ancillaryDepartmentId = this.laboratoryForm.controls['ancillaryDepartmentId'].value;
    obj.ancillarySpecializationId = this.laboratoryForm.controls['ancillarySpecializationId'].value;
    obj.activeInactiveStatus = this.laboratoryForm.controls['activeInactiveStatus'].value;
    obj.modifiedBy = 'Fox';
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.laboratoryService.putLaboratory(data.id, obj).subscribe({
        next: (result: Laboratory) => {
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

  getValue(): Laboratory {
    this.laboratory = new Laboratory();
    this.laboratory.createdBy = 'admin';
    this.laboratory.code = this.laboratoryForm.controls['code'].value;
    this.laboratory.description = this.laboratoryForm.controls['description'].value;
    this.laboratory.price = this.laboratoryForm.controls['price'].value;
    this.laboratory.highestPrice = this.laboratoryForm.controls['highestPrice'].value;
    this.laboratory.lowestPrice = this.laboratoryForm.controls['lowestPrice'].value;
    this.laboratory.priceReferenceIndex = this.laboratoryForm.controls['priceReferenceIndex'].value;
    this.laboratory.diagnosisRemarks = this.laboratoryForm.controls['diagnosisRemarks'].value;
    this.laboratory.departmentCode = this.departmentCode ?? "";
    this.laboratory.specializationCode = this.specializationCode ?? "";
    this.laboratory.ancillaryDepartmentId = this.laboratoryForm.controls['ancillaryDepartmentId'].value;
    this.laboratory.ancillarySpecializationId = this.laboratoryForm.controls['ancillarySpecializationId'].value;
    this.laboratory.activeInactiveStatus = this.laboratoryForm.controls['activeInactiveStatus'].value;
    return this.laboratory;
  }
}
