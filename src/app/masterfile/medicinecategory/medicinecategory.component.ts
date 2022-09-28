import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Medicinecategory } from 'src/app/models/medicinecategory.model';
import { MedicinecategoryService } from 'src/app/services/medicinecategory.service';
import { PopupMedicinecategoryComponent } from '../popup/popup-medicinecategory/popup-medicinecategory.component';

@Component({
  selector: 'app-medicinecategory',
  templateUrl: './medicinecategory.component.html',
  styleUrls: ['./medicinecategory.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class MedicinecategoryComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  medicinecategory: Medicinecategory;
  prevMedicineCategoryList: Medicinecategory[];
  medicinecategoryList: Medicinecategory[];
  selectedMedicineCategory: Medicinecategory[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private medicinecategoryService: MedicinecategoryService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.medicinecategoryService.getMedicineCategory().subscribe({
      next: (result: Medicinecategory[]) => {
        this.medicinecategoryList = result;
        this.prevMedicineCategoryList = this.medicinecategoryList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
  filter() {
    console.log(this.selectedMedicineCategory)
    let filter: any[] = [];
    this.medicinecategoryList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.prevMedicineCategoryList = filter;
  }
  addMedicineCategoryPopup() {
    this.ref = this.dialogService.open(PopupMedicinecategoryComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Medicinecategory) => {
      if (data != undefined) {
        this.medicinecategoryList.push(data);
        this.prevMedicineCategoryList = this.medicinecategoryList.filter(x => x.status);
      }
    })
  }
  updateMedicineCategoryPopUp(medicineCategory: Medicinecategory) {
    this.ref = this.dialogService.open(PopupMedicinecategoryComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        medicineCategory,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Medicinecategory) => {

      if (data != undefined) {
        this.medicinecategoryList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevMedicineCategoryList = this.medicinecategoryList.filter(x => x.status);
      }
    })
  }
  removeMedicineCategoryRecord(medicineCategory: Medicinecategory) {
    if (medicineCategory != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.medicinecategoryService.deleteMedicineCategory(medicineCategory.id).subscribe({
            next: (result: boolean) => {
              result;
              this.medicinecategoryList.forEach(element => {
                if (medicineCategory.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevMedicineCategoryList = this.medicinecategoryList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteMedicineCategory() {
    if (this.selectedMedicineCategory.length > 0) {
      console.log(this.selectedMedicineCategory)
      this.selectedMedicineCategory.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.medicinecategoryService.batchdeleteMedicineCategory(this.selectedMedicineCategory).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.medicinecategoryList.forEach(val => {
              let x = this.selectedMedicineCategory.find(x => x.id == val.id);
              if (x != undefined && x != null) {
                val.status = false;
              }
            });
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
          this.prevMedicineCategoryList = this.medicinecategoryList.filter(x => x.status);
        }
      });
    }
  }

}
