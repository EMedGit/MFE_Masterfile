import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand.model';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineBrand } from 'src/app/models/medicinebrand.model';
import { Medicinecategory } from 'src/app/models/medicinecategory.model';
import { BrandService } from 'src/app/services/brand.service';
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
  brand: Brand;
  brandList: Brand[];
  medicineBrand: MedicineBrand;
  medicineBrandList: MedicineBrand[];
  medicineId: number;
  brandId: number;
  brandName: string;
  medicineNewData: Medicine;
  medicineBrandId: number;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;

  mcList: Medicinecategory[];
  selectedMC: Medicinecategory;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private medicineService: MedicineService, private mcService: MedicinecategoryService, private brandService: BrandService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.medicine.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.medicineForm.patchValue(this.config.data.medicine);
    this.loadData();
    this.onValueChanges();
  }

  loadData(): void {
    this.brandService.getBrandList().subscribe(retVal => { this.brandList = retVal });
    this.medicineService.getMedicineBrandList().subscribe(retVal => { this.medicineBrandList= retVal })
    this.mcService.getMedicineCategory().subscribe(retVal => { this.mcList = retVal });
  }
  onValueChanges(): void {
    this.medicineForm.valueChanges.subscribe(value => {
      if (this.brandList != undefined) {
        value.BrandData = this.brandList.find(t => t.id == value.BrandData)?.description ?? null;
        this.brandName = value.BrandData;
      }
    });
  }
  selectedItem(event: any) {
    this.brand = event.value;
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
        categoryId: null,
        BrandData: null
      });

    // this.mcService.getMedicineCategory().subscribe({
    //   next: (result: Medicinecategory[]) => {
    //     this.mcList = result;
    //     this.mcList = this.mcList.filter(x => x.status);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log(this.mcList);
    //   }
    // });
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
          this.disableButton = true;
          this.medicineService.insert(this.getData()).subscribe({
            next: result => {
              this.getNewData();
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
  getMedicineBrand(medicineID: number): MedicineBrand {
    this.medicineBrand = new MedicineBrand();
    if (this.brand == undefined) {
      let x = this.brandList.find(x => x.id == this.brand.id);
      this.medicineBrand.brandId = x?.id;
      this.medicineBrand.brandName = x?.description;
      this.medicineBrand.medicineId = medicineID ?? 0;
    } else {
      this.medicineBrand.brandId = this.brand.id;
      this.medicineBrand.brandName = this.brand.description;
      this.medicineBrand.medicineId = medicineID ?? 0;
    }
    return this.medicineBrand;
  }
  getNewData() {
    this.medicineService.GetMedicinesByCode(this.medicineForm.controls['code'].value).subscribe(retVal => {
      let objs = retVal.find(x => x.code == this.medicineForm.controls['code'].value)
      this.medicineId = objs?.id ?? 0;
      if(this.isForSaving){
        this.medicineService.postMedicineBrand(this.getMedicineBrand(this.medicineId)).subscribe()
      } else if (this.isForUpdating) {
        this.medicineService.getMedicineBrandById(this.medicineId).subscribe(retVal => {
          let obj = retVal.find(x => x.medicineId == this.medicineId)
          this.medicineBrandId = obj?.id ?? 0;
          this.medicineService.putMedicineBrand(this.medicineBrandId, this.getMedicineBrand(this.medicineId)).subscribe();
        });
      }
    });
  }

  getData(): Medicine {
    this.medicine = new Medicine();
    this.medicine.code = this.medicineForm.controls['code'].value;
    this.medicine.description = this.medicineForm.controls['description'].value;
    this.medicine.genericName = this.medicineForm.controls['genericName'].value;
    this.medicine.cost = this.medicineForm.controls['cost'].value;
    this.medicine.price = this.medicineForm.controls['price'].value;
    this.medicine.categoryId = this.medicineForm.controls['categoryId'].value;
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
    data.categoryId = this.medicineForm.controls['categoryId'].value;
    data.activeInActiveStatus = this.medicineForm.controls['activeInActiveStatus'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.medicineService.update(data.id, data).subscribe({
        next: (result: Medicine) => {
          data = result;
          this.getNewData();
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
}
