import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Medicine } from 'src/app/models/medicine.model';
import { Medicinecategory } from 'src/app/models/medicinecategory.model';
import { MedicinecategoryService } from 'src/app/services/medicinecategory.service';
import { MedicineService } from 'src/app/services/medicines.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-medicine',
  templateUrl: './popup-medicine.component.html',
  styleUrls: ['./popup-medicine.component.css']
})
export class PopupMedicineComponent implements OnInit {

  medicineForm: FormGroup;
  formBuilder: FormBuilder;

  medicine: Medicine;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  mcList: Medicinecategory[];
  selectedMC: Medicinecategory;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private medicineService: MedicineService, private mcService: MedicinecategoryService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.medicine.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.medicineForm.patchValue(this.config.data.medicine);
  }


  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.medicineForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        genericName: [''],
        cost: null,
        price: null,
        activeInActiveStatus: false,
        categoryId: null
      });

    this.mcService.getMedicineCategory().subscribe({
      next: (result: Medicinecategory[]) => {
        this.mcList = result;
        this.mcList = this.mcList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.mcList);
      }
    });
  }

  ClosePopUp(data: Medicine) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.medicineService.GetMedicinesByCode(this.medicineForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.medicineForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.medicineService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
        }
      });
    }
  }

  getData(): Medicine {
    this.medicine = new Medicine();
    this.medicine.code = this.medicineForm.controls['code'].value;
    this.medicine.description = this.medicineForm.controls['description'].value;
    this.medicine.genericName = this.medicineForm.controls['genericName'].value;
    this.medicine.cost = this.medicineForm.controls['cost'].value;
    this.medicine.price = this.medicineForm.controls['price'].value;
    this.medicine.categoryId = this.selectedMC.id;
    this.medicine.activeInActiveStatus = this.medicineForm.controls['activeInActiveStatus'].value;
    this.medicine.createdBy = '';
    this.medicine.createdDateTime = new Date();
    return this.medicine;
  }

  updateData() {
    let data = this.config.data.medicine;
    data.code = this.medicineForm.controls['code'].value;
    data.description = this.medicineForm.controls['description'].value;
    data.genericName = this.medicineForm.controls['genericName'].value;
    data.cost = this.medicineForm.controls['cost'].value;
    data.price = this.medicineForm.controls['price'].value;
    data.categoryId = this.selectedMC.id;
    data.activeInActiveStatus = this.medicineForm.controls['activeInActiveStatus'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.medicineService.update(data.id, data).subscribe({
        next: (result: Medicine) => {
          data = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('update complete');
        }
      });
    }

  }



}
