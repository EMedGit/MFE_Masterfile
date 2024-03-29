import { DatePipe, XhrFactory } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Barangay } from 'src/app/models/barangay.model';
import { AddressService } from 'src/app/services/address.service';
import { PopupBarangayComponent } from '../popup/popup-barangay/popup-barangay.component';

@Component({
  selector: 'app-barangay',
  templateUrl: './barangay.component.html',
  styleUrls: ['./barangay.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class BarangayComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  barangay: Barangay;
  prevBarangayList: Barangay[];
  barangayList: Barangay[];
  selectedBarangay: Barangay[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private addressService: AddressService, private confirmationService: ConfirmationService, private dialogService: DialogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.addressService.getBarangay().subscribe({
      next: (result: Barangay[]) => {
        this.barangayList = result;
        this.prevBarangayList = this.barangayList.filter(x => x.status);
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
    let filter: any[] = [];
    this.barangayList.forEach(val => {
      if (val.barangayName.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevBarangayList = filter;
  }
  addBarangayPopup() {
    this.ref = this.dialogService.open(PopupBarangayComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data: Barangay) => {
      if (data != undefined) {
        this.barangayList.push(data);
        this.prevBarangayList = this.barangayList.filter(x => x.status);
      }
    });
  }
  updateBarangayPopUp(barangay: Barangay) {
    this.ref = this.dialogService.open(PopupBarangayComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        barangay,
        isForUpdating: true
      }
    });
    this.ref.onClose.subscribe((data: Barangay) => {
      if (data != undefined) {
        this.barangayList.forEach(val => {
          if (val.id == data.id) {
            val.barangayCode = data.barangayCode;
            val.barangayName = data.barangayName;
            val.provinceCode = data.provinceCode;
            val.municipalityCode = data.municipalityCode;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevBarangayList = this.barangayList.filter(x => x.status);
      }
    });
  }
  removeBarangayRecord(barangay: Barangay) {
    if (barangay != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.addressService.deleteBarangay(barangay.id).subscribe({
            next: (result: boolean) => {
              result;
              this.barangayList.forEach(element => {
                if (barangay.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevBarangayList = this.barangayList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteBarangay() {
    if (this.selectedBarangay.length > 0) {
      console.log(this.selectedBarangay)
      this.selectedBarangay.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.addressService.batchdeleteBarangay(this.selectedBarangay).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.barangayList.forEach(val => {
              let x = this.selectedBarangay.find(x => x.id == val.id);
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
          this.prevBarangayList = this.barangayList.filter(x => x.status);
        }
      });
    }
  }
}
