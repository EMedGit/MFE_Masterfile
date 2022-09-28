import { DatePipe } from '@angular/common';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CivilStatus } from 'src/app/models/civilstatus.model';
import { CivilstatusService } from 'src/app/services/civilstatus.service';
import { PopupCivilstatusComponent } from '../popup/popup-civilstatus/popup-civilstatus.component';

@Component({
  selector: 'app-civilstatus',
  templateUrl: './civilstatus.component.html',
  styleUrls: ['./civilstatus.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class CivilstatusComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  civilstatus: CivilStatus;
  prevCivilStatusList: CivilStatus[];
  civilstatusList: CivilStatus[];
  selectedCivilStatus: CivilStatus[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private civilstatusService: CivilstatusService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {

    this.civilstatusService.getCivilStatus().subscribe({
      next: (result: CivilStatus[]) => {
        this.civilstatusList = result;
        this.prevCivilStatusList = this.civilstatusList.filter(x => x.status);
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
    console.log(this.selectedCivilStatus)
    let filter: any[] = [];
    this.civilstatusList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.prevCivilStatusList = filter;

  }

  addCivilStatusPopup() {
    this.ref = this.dialogService.open(PopupCivilstatusComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: CivilStatus) => {
      if (data != undefined) {
        this.civilstatusList.push(data);
        this.prevCivilStatusList = this.civilstatusList.filter(x => x.status);
      }
    })
  }
  updateCivilStatusPopUp(civilStatus: CivilStatus) {
    this.ref = this.dialogService.open(PopupCivilstatusComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        civilStatus,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: CivilStatus) => {

      if (data != undefined) {
        this.civilstatusList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevCivilStatusList = this.civilstatusList.filter(x => x.status);
      }
    })
  }
  removeCivilStatusRecord(civilStatus: CivilStatus) {
    if (civilStatus != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.civilstatusService.deleteCivilStatus(civilStatus.id).subscribe({
            next: (result: boolean) => {
              result;
              this.civilstatusList.forEach(element => {
                if (civilStatus.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevCivilStatusList = this.civilstatusList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteCivilStatus() {
    if (this.selectedCivilStatus.length > 0) {
      console.log(this.selectedCivilStatus)
      this.selectedCivilStatus.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.civilstatusService.batchdeleteCivilStatus(this.selectedCivilStatus).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.civilstatusList.forEach(val => {
              let x = this.selectedCivilStatus.find(x => x.id == val.id);
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
          this.prevCivilStatusList = this.civilstatusList.filter(x => x.status);
        }
      });
    }
  }
}
