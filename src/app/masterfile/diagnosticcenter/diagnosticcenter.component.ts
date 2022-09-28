import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiagnosticCenter } from 'src/app/models/diagnosticcenter.model';
import { DiagnosticcenterService } from 'src/app/services/diagnosticcenter.service';
import { PopupDiagnosticcenterComponent } from '../popup/popup-diagnosticcenter/popup-diagnosticcenter.component';

@Component({
  selector: 'app-diagnosticcenter',
  templateUrl: './diagnosticcenter.component.html',
  styleUrls: ['./diagnosticcenter.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class DiagnosticcenterComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  diagnosticcenter: DiagnosticCenter;
  prevDiagnosticCenter: DiagnosticCenter[];
  diagnosticCenterList: DiagnosticCenter[];
  selectedDiagnosticCenter: DiagnosticCenter[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private diagnosticCenterService: DiagnosticcenterService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.diagnosticCenterService.getDiagnosticCenter().subscribe({
      next: (result: DiagnosticCenter[]) => {
        this.diagnosticCenterList = result;
        this.prevDiagnosticCenter = this.diagnosticCenterList.filter(x => x.status);
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
    console.log(this.selectedDiagnosticCenter)
    let filter: any[] = [];
    this.diagnosticCenterList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevDiagnosticCenter = filter;
  }
  addDiagnosticCenterPopup() {
    this.ref = this.dialogService.open(PopupDiagnosticcenterComponent, {
      width: '1000px',
      height: '300px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: DiagnosticCenter) => {
      if (data != undefined) {
        this.diagnosticCenterList.push(data);
        this.prevDiagnosticCenter = this.diagnosticCenterList.filter(x => x.status);
      }
    })
  }
  updateDiagnosticCenterPopUp(diagnosticcenter: DiagnosticCenter) {
    this.ref = this.dialogService.open(PopupDiagnosticcenterComponent, {
      width: '1000px',
      height: '300px',
      showHeader: true,
      closable: false,
      data: {
        diagnosticcenter,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: DiagnosticCenter) => {

      if (data != undefined) {
        this.diagnosticCenterList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevDiagnosticCenter = this.diagnosticCenterList.filter(x => x.status);
      }
    })
  }
  removeDiagnosticCenterRecord(diagnosticcenter: DiagnosticCenter) {
    if (diagnosticcenter != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.diagnosticCenterService.deleteDiagnosticCenter(diagnosticcenter.id).subscribe({
            next: (result: boolean) => {
              result;
              this.diagnosticCenterList.forEach(element => {
                if (diagnosticcenter.id == element.id) {
                  element.status = false;
                }

              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevDiagnosticCenter = this.diagnosticCenterList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteDiagnosticCenter() {
    if (this.selectedDiagnosticCenter.length > 0) {
      console.log(this.selectedDiagnosticCenter)
      this.selectedDiagnosticCenter.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.diagnosticCenterService.batchdeleteDiagnosticCenter(this.selectedDiagnosticCenter).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.diagnosticCenterList.forEach(val => {
              let x = this.selectedDiagnosticCenter.find(x => x.id == val.id);
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
          this.prevDiagnosticCenter = this.diagnosticCenterList.filter(x => x.status);
        }
      });
    }
  }
}
