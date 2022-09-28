import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Discounts } from 'src/app/models/discounts.model';
import { DiscountsService } from 'src/app/services/discounts.service';
import { PopupDiscountsComponent } from '../popup/popup-discounts/popup-discounts.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class DiscountsComponent implements OnInit {

  searchkey: ""
  ref: DynamicDialogRef;
  discounts: Discounts;
  prevDiscountsList: Discounts[];
  discountsList: Discounts[];
  selectedDiscounts: Discounts[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private discountsService: DiscountsService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.discountsService.getDiscounts().subscribe({
      next: (result: Discounts[]) => {
        this.discountsList = result;
        this.prevDiscountsList = this.discountsList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  filter() {
    let filter: any[] = [];
    this.discountsList.forEach(val => {
      if (val.patientTypeDescription?.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevDiscountsList = filter;
  }
  addDiscountsPopup() {
    this.ref = this.dialogService.open(PopupDiscountsComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data: Discounts) => {
      if (data != undefined) {
        this.discountsList.push(data);
        this.prevDiscountsList = this.discountsList.filter(x => x.status);
      }
    });
  }
  updateDiscountsPopUp(discounts: Discounts) {
    this.ref = this.dialogService.open(PopupDiscountsComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        discounts,
        isForUpdating: true
      }
    });
    this.ref.onClose.subscribe((data: Discounts) => {

      if (data != undefined) {
        this.discountsList.forEach(val => {
          if (val.id == data.id) {
            val.patientTypeDescription = data.patientTypeDescription;
            val.discountSchemaLaboratory = data.discountSchemaLaboratory;
            val.discountSchemaPharmacy = data.discountSchemaPharmacy;
            val.discountSchemaRadiology = data.discountSchemaRadiology;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevDiscountsList = this.discountsList.filter(x => x.status);
      }
    });
  }
  removeDiscountsRecord(discounts: Discounts) {
    if (discounts != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.discountsService.deleteDiscounts(discounts.id).subscribe({
            next: (result: boolean) => {
              result;
              this.discountsList.forEach(element => {
                if (discounts.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevDiscountsList = this.discountsList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteDiscounts() {
    if (this.selectedDiscounts.length > 0) {
      this.selectedDiscounts.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.discountsService.btachdeleteDiscounts(this.selectedDiscounts).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.discountsList.forEach(val => {
              let x = this.selectedDiscounts.find(x => x.id == val.id);
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
          this.prevDiscountsList = this.discountsList.filter(x => x.status);
        }
      });
    }
  }

}
