import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReferralCategoryDetail } from 'src/app/models/referralcategorydetail.model';
import { ReferralcategorydetailService } from 'src/app/services/referralcategorydetail.service';
import { PopupReferralcategorydetailComponent } from '../popup/popup-referralcategorydetail/popup-referralcategorydetail.component';

@Component({
  selector: 'app-referralcategorydetail',
  templateUrl: './referralcategorydetail.component.html',
  styleUrls: ['./referralcategorydetail.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ReferralcategorydetailComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  referralcategorydetail: ReferralCategoryDetail;
  prevReferralCategoryDetail: ReferralCategoryDetail[];
  referralcategorydetailList: ReferralCategoryDetail[];
  selectedReferralCategoryDetail: ReferralCategoryDetail[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private referralcategorydetailService: ReferralcategorydetailService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.referralcategorydetailService.getReferralcategorydetail().subscribe({
      next: (result: ReferralCategoryDetail[]) => {
        this.referralcategorydetailList = result;
        this.prevReferralCategoryDetail = this.referralcategorydetailList.filter(x => x.status);
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
    console.log(this.selectedReferralCategoryDetail)
    let filter: any[] = [];
    this.referralcategorydetailList.forEach(val => {
      console.log(val)
      if (val.referralCategoryDescription.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    this.prevReferralCategoryDetail = filter;
  }
  addReferralCategoryDetailPopup() {
    this.ref = this.dialogService.open(PopupReferralcategorydetailComponent, {
      width: '1000px',
      height: '380px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ReferralCategoryDetail) => {
      if (data != undefined) {
        this.referralcategorydetailList.push(data);
        this.prevReferralCategoryDetail = this.referralcategorydetailList.filter(x => x.status);
      }
    })
  }
  updateReferralCategoryDetailPopUp(referralcategorydetail: ReferralCategoryDetail) {
    this.ref = this.dialogService.open(PopupReferralcategorydetailComponent, {
      width: '1000px',
      height: '380px',
      showHeader: true,
      closable: false,
      data: {
        referralcategorydetail,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: ReferralCategoryDetail) => {

      if (data != undefined) {
        this.referralcategorydetailList.forEach(val => {
          if (val.id == data.id) {
            val.referralCategoryDescription = data.referralCategoryDescription;
            val.condition = data.condition;
            val.indications = data.indications;
            val.category = data.category;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevReferralCategoryDetail = this.referralcategorydetailList.filter(x => x.status);
      }
    })
  }
  removeReferralCategoryDetailRecord(referralcategorydetail: ReferralCategoryDetail) {
    if (referralcategorydetail != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.referralcategorydetailService.deleteReferralcategorydetail(referralcategorydetail.id).subscribe({
            next: (result: boolean) => {
              result;
              this.referralcategorydetailList.forEach(element => {
                if (referralcategorydetail.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevReferralCategoryDetail = this.referralcategorydetailList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteReferralDetailCategory() {
    if (this.selectedReferralCategoryDetail.length > 0) {
      console.log(this.selectedReferralCategoryDetail)
      this.selectedReferralCategoryDetail.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.referralcategorydetailService.batchdeleteReferralcategorydetail(this.selectedReferralCategoryDetail).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.referralcategorydetailList.forEach(val => {
              let x = this.selectedReferralCategoryDetail.find(x => x.id == val.id);
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
          this.prevReferralCategoryDetail = this.referralcategorydetailList.filter(x => x.status);
        }
      });
    }
  }
}
