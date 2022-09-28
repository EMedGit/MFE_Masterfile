import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReferralCategory } from 'src/app/models/referralcategory.model';
import { ReferralcategoryService } from 'src/app/services/referralcategory.service';
import { PopupReferralcategoryComponent } from '../popup/popup-referralcategory/popup-referralcategory.component';

@Component({
  selector: 'app-referralcategory',
  templateUrl: './referralcategory.component.html',
  styleUrls: ['./referralcategory.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ReferralcategoryComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  referralcategory: ReferralCategory;
  prevReferralCategory: ReferralCategory[];
  referralcategoryList: ReferralCategory[];
  selectedReferralCategory: ReferralCategory[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private referralcategoryService: ReferralcategoryService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.referralcategoryService.getReferralcategory().subscribe({
      next: (result: ReferralCategory[]) => {
        this.referralcategoryList = result;
        this.prevReferralCategory = this.referralcategoryList.filter(x => x.status);
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
    console.log(this.selectedReferralCategory)
    let filter: any[] = [];
    this.referralcategoryList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevReferralCategory = filter;
  }
  addReferralCategoryPopup() {
    this.ref = this.dialogService.open(PopupReferralcategoryComponent, {
      width: '1000px',
      height: '275px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ReferralCategory) => {
      if (data != undefined) {
        this.referralcategoryList.push(data);
        this.prevReferralCategory = this.referralcategoryList.filter(x => x.status);
      }
    })
  }
  updateReferralCategoryPopUp(referralcategory: ReferralCategory) {
    this.ref = this.dialogService.open(PopupReferralcategoryComponent, {
      width: '1000px',
      height: '275px',
      showHeader: true,
      closable: false,
      data: {
        referralcategory,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: ReferralCategory) => {

      if (data != undefined) {
        this.referralcategoryList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevReferralCategory = this.referralcategoryList.filter(x => x.status);
      }
    })
  }
  removeReferralCategoryRecord(referralcategory: ReferralCategory) {
    if (referralcategory != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.referralcategoryService.deleteReferralcategory(referralcategory.id).subscribe({
            next: (result: boolean) => {
              result;
              this.referralcategoryList.forEach(element => {
                if (referralcategory.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevReferralCategory = this.referralcategoryList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteReferralCategory() {
    if (this.selectedReferralCategory.length > 0) {
      console.log(this.selectedReferralCategory)
      this.selectedReferralCategory.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.referralcategoryService.batchdeleteReferralcategory(this.selectedReferralCategory).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.referralcategoryList.forEach(val => {
              let x = this.selectedReferralCategory.find(x => x.id == val.id);
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
          this.prevReferralCategory = this.referralcategoryList.filter(x => x.status);
        }
      });
    }
  }
}
