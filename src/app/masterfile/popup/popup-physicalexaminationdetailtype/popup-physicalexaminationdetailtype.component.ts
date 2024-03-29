import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationDetailType } from 'src/app/models/physicalexaminationdetailtype.model';
import { PhysicalExaminationDetailTypeService } from 'src/app/services/physicalexaminationdetailtype.service';
import { PhysicalExaminationTypeService } from 'src/app/services/physicalexaminationtype.service';
import { PhysicalExaminationType } from 'src/app/models/physicalexaminationtype.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-physicalexaminationdetailtype',
  templateUrl: './popup-physicalexaminationdetailtype.component.html',
  styleUrls: ['./popup-physicalexaminationdetailtype.component.css']
})
export class PopupPhysicalexaminationdetailtypeComponent implements OnInit {

  physicalExaminationDetailTypeForm: FormGroup;
  formBuilder: FormBuilder;
  physicalExaminationDetailType: PhysicalExaminationDetailType;
  peType: PhysicalExaminationType = new PhysicalExaminationType();
  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  petList: PhysicalExaminationType[];
  selectedpet: PhysicalExaminationType;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private pedtService: PhysicalExaminationDetailTypeService,
    private petService: PhysicalExaminationTypeService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.physicalExaminationDetailType.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.physicalExaminationDetailTypeForm.patchValue(this.config.data.physicalExaminationDetailType);
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.physicalExaminationDetailTypeForm = this.formBuilder.group(
      {
        physicalExaminationTypeId: [''],
        code: [''],
        description: ['']
      });

    this.petService.get().subscribe({
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


    if (this.isForUpdating == true) {
      //let pet = this.petList.filter(x => x.id = this.physicalExaminationDetailType.physicalExaminationTypeId);
      // let pet = Object.assign(this.peType, this.config.data.physicalExaminationDetailType.physicalExaminationTypeId);
      // console.log(pet);
    }
  }

  ClosePopUp(data: PhysicalExaminationDetailType) {
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
      this.pedtService.GetPhysicalExaminationDetailTypeByCode(this.physicalExaminationDetailTypeForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.physicalExaminationDetailTypeForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.pedtService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
        }
      });
    }
  }


  updateData() {
    let peType = Object.assign(this.peType, this.physicalExaminationDetailTypeForm.controls['physicalExaminationTypeId'].value);

    let data = this.config.data.physicalExaminationDetailType;
    data.physicalExaminationTypeId = peType.id;
    data.code = this.physicalExaminationDetailTypeForm.controls['code'].value;
    data.description = this.physicalExaminationDetailTypeForm.controls['description'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.pedtService.update(data.id, data).subscribe({
        next: (result: PhysicalExaminationDetailType) => {
          data = result;
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

  getData(): PhysicalExaminationDetailType {

    let peType = Object.assign(this.peType, this.physicalExaminationDetailTypeForm.controls['physicalExaminationTypeId'].value);

    this.physicalExaminationDetailType = new PhysicalExaminationDetailType();
    this.physicalExaminationDetailType.code = this.physicalExaminationDetailTypeForm.controls['code'].value;
    this.physicalExaminationDetailType.description = this.physicalExaminationDetailTypeForm.controls['description'].value;
    this.physicalExaminationDetailType.physicalExaminationTypeId = peType.id;
    this.physicalExaminationDetailType.createdBy = '';
    this.physicalExaminationDetailType.createdDateTime = new Date();
    return this.physicalExaminationDetailType;
  }
}
