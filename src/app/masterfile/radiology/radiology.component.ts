import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Radiology } from 'src/app/models/radiology.model';
import { RadiologyService } from 'src/app/services/radiology.service';
import { PopupRadiologyComponent } from '../popup/popup-radiology/popup-radiology.component';

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class RadiologyComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  radiology: Radiology;
  prevRadiology: Radiology[];
  radiologyList: Radiology[];
  selectedRadiology: Radiology[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private radiologyService: RadiologyService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.radiologyService.getRadiology().subscribe({
      next: (result: Radiology[]) => {
        this.radiologyList = result;
        this.prevRadiology = this.radiologyList.filter(x => x.status);
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
    console.log(this.selectedRadiology)
    let filter: any[] = [];
    this.radiologyList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevRadiology = filter;
  }
  addRadiologyPopup() {
    this.ref = this.dialogService.open(PopupRadiologyComponent, {
      width: '1200px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Radiology) => {
      if (data != undefined) {
        this.radiologyList.push(data);
        this.prevRadiology = this.radiologyList.filter(x => x.status);
      }
    })
  }
  updateRadiologyPopUp(radiology: Radiology) {
    this.ref = this.dialogService.open(PopupRadiologyComponent, {
      width: '1200px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        radiology,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Radiology) => {

      if (data != undefined) {
        this.radiologyList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.price = data.price;
            val.highestPrice = data.highestPrice;
            val.lowestPrice = data.lowestPrice;
            val.priceReferenceIndex = data.priceReferenceIndex;
            val.diagnosisRemarks = data.diagnosisRemarks;
            val.departmentCode = data.departmentCode;
            val.specializationCode = data.specializationCode;
            val.ancillaryDepartmentId = data.ancillaryDepartmentId;
            val.ancillarySectionId = data.ancillarySectionId;
            val.activeInactiveStatus = data.activeInactiveStatus;
            val.status = data.status;
            val.modifiedBy = data.modifiedBy;
            val.modifiedDateTime = data.modifiedDateTime;
          }
        });
        this.prevRadiology = this.radiologyList.filter(x => x.status);
      }
    })
  }
  removeRadiologyRecord(radiology: Radiology) {
    if (radiology != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.radiologyService.deleteRadiology(radiology.id).subscribe({
            next: (result: boolean) => {
              result;
              this.radiologyList.forEach(element => {
                if (radiology.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevRadiology = this.radiologyList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteRadiology() {
    if (this.selectedRadiology.length > 0) {
      console.log(this.selectedRadiology)
      this.selectedRadiology.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.radiologyService.batchdeleteRadiology(this.selectedRadiology).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.radiologyList.forEach(val => {
              let x = this.selectedRadiology.find(x => x.id == val.id);
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
          this.prevRadiology = this.radiologyList.filter(x => x.status);
        }
      });
    }
  }
}
