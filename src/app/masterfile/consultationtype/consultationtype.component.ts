import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Consultationtype } from 'src/app/models/consultationtype.model';
import { ConsultationtypeService } from 'src/app/services/consultationtype.service';
import { PopupConsultationtypeComponent } from '../popup/popup-consultationtype/popup-consultationtype.component';

@Component({
  selector: 'app-consultationtype',
  templateUrl: './consultationtype.component.html',
  styleUrls: ['./consultationtype.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ConsultationtypeComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  consultationtype: Consultationtype;
  prevConsultationTypeList: Consultationtype[];
  consultationtypeList: Consultationtype[];
  selectedConsultationType: Consultationtype[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private consultationtypeService: ConsultationtypeService, private confirmationService: ConfirmationService, private dialogService: DialogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {

    this.consultationtypeService.getConsultationTypeList().subscribe({
      next: (result: Consultationtype[]) => {
        this.consultationtypeList = result;
        this.prevConsultationTypeList = this.consultationtypeList.filter(x => x.status);
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
    console.log(this.selectedConsultationType)
    let filter: any[] = [];
    this.consultationtypeList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.prevConsultationTypeList = filter;
  }
  addConsultationTypePopup() {
    this.ref = this.dialogService.open(PopupConsultationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Consultationtype) => {
      if (data != undefined) {
        this.consultationtypeList.push(data);
        this.prevConsultationTypeList = this.consultationtypeList.filter(x => x.status);
      }
    })
  }
  updateConsultationTypePopUp(consultationType: Consultationtype) {
    this.ref = this.dialogService.open(PopupConsultationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        consultationType,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Consultationtype) => {

      if (data != undefined) {
        this.consultationtypeList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
            val.healthFacilityCode = data.healthFacilityCode;
          }
        });
        this.prevConsultationTypeList = this.consultationtypeList.filter(x => x.status);
      }
    })
  }
  removeConsultationTypeRecord(consultationType: Consultationtype) {
    if (consultationType != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.consultationtypeService.deleteConsultationType(consultationType.id).subscribe({
            next: (result: boolean) => {
              result;
              this.consultationtypeList.forEach(element => {
                if (consultationType.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevConsultationTypeList = this.consultationtypeList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteConsultationType() {
    if (this.selectedConsultationType.length > 0) {
      console.log(this.selectedConsultationType)
      this.selectedConsultationType.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.consultationtypeService.batchdeleteConsultationType(this.selectedConsultationType).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.consultationtypeList.forEach(val => {
              let x = this.selectedConsultationType.find(x => x.id == val.id);
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
          this.prevConsultationTypeList = this.consultationtypeList.filter(x => x.status);
        }
      });
    }
  }
}
