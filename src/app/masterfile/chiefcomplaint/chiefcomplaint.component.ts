import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ChiefComplaint } from 'src/app/models/chiefcomplaint.model';
import { ChiefcomplaintService } from 'src/app/services/chiefcomplaint.service';
import { PopupChiefcomplaintComponent } from '../popup/popup-chiefcomplaint/popup-chiefcomplaint.component';

@Component({
  selector: 'app-chiefcomplaint',
  templateUrl: './chiefcomplaint.component.html',
  styleUrls: ['./chiefcomplaint.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ChiefcomplaintComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  chiefcomplaint: ChiefComplaint;
  prevChiefComplaint: ChiefComplaint[];
  chiefcomplaintList: ChiefComplaint[];
  selectedChiefComplaint: ChiefComplaint[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private chiefcomplaintService: ChiefcomplaintService, private confirmationService: ConfirmationService, private dialogService: DialogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    console.log('hello');
    this.chiefcomplaintService.getChiefcomplaint().subscribe({
      next: (result: ChiefComplaint[]) => {
        this.chiefcomplaintList = result;
        this.prevChiefComplaint = this.chiefcomplaintList.filter(x => x.status); ``
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
    console.log(this.selectedChiefComplaint)
    let filter: any[] = [];
    this.chiefcomplaintList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevChiefComplaint = filter;
  }
  addChiefComplaintPopup() {
    this.ref = this.dialogService.open(PopupChiefcomplaintComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ChiefComplaint) => {
      if (data != undefined) {
        this.chiefcomplaintList.push(data);
        this.prevChiefComplaint = this.chiefcomplaintList.filter(x => x.status);
      }
    })
  }
  updateChiefComplaintPopUp(chiefcomplaint: ChiefComplaint) {
    this.ref = this.dialogService.open(PopupChiefcomplaintComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        chiefcomplaint,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: ChiefComplaint) => {

      if (data != undefined) {
        this.chiefcomplaintList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevChiefComplaint = this.chiefcomplaintList.filter(x => x.status);
      }
    })
  }
  removeChiefComplaintRecord(chiefcomplaint: ChiefComplaint) {
    if (chiefcomplaint != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.chiefcomplaintService.deleteChiefcomplaint(chiefcomplaint.id).subscribe({
            next: (result: boolean) => {
              result;
              this.chiefcomplaintList.forEach(element => {
                if (chiefcomplaint.id == element.id) {
                  element.status = false;
                }

              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevChiefComplaint = this.chiefcomplaintList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
  batchdeleteChiefComplaint() {
    if (this.selectedChiefComplaint.length > 0) {
      console.log(this.selectedChiefComplaint)
      this.selectedChiefComplaint.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.chiefcomplaintService.batchdeleteChiefcomplaint(this.selectedChiefComplaint).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.chiefcomplaintList.forEach(val => {
              let x = this.selectedChiefComplaint.find(x => x.id == val.id);
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
          this.prevChiefComplaint = this.chiefcomplaintList.filter(x => x.status);
        }
      });
    }
  }
}
