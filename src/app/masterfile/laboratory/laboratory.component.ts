import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Laboratory } from 'src/app/models/laboratory.model';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PopupLaboratoryComponent } from '../popup/popup-laboratory/popup-laboratory.component';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
  providers: [DialogService]
})
export class LaboratoryComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  laboratory : Laboratory;
  prevLaboratory : Laboratory[];
  laboratoryList : Laboratory[];
  selectedLaboratory : Laboratory[];

  constructor(private laboratoryService : LaboratoryService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.laboratoryService.getLaboratory().subscribe({
      next: (result: Laboratory[]) => {
        this.laboratoryList = result;
        this.prevLaboratory = this.laboratoryList.filter(x => x.status);
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
    console.log(this.selectedLaboratory)
    let filter: any[] = [];
    this.laboratoryList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevLaboratory = filter;
  }
  addLaboratoryPopup() {
    this.ref = this.dialogService.open(PopupLaboratoryComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Laboratory) => {
      if (data != undefined) {
        this.laboratoryList.push(data);
        this.prevLaboratory = this.laboratoryList.filter(x => x.status);
      }
    })
  }
  updateLaboratoryPopUp(laboratory : Laboratory) {
    this.ref = this.dialogService.open(PopupLaboratoryComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        laboratory,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Laboratory) => {

      if (data != undefined) {
        this.laboratoryList.forEach(val => {
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
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevLaboratory = this.laboratoryList.filter(x => x.status);
      }
    })
  }
  removeLaboratoryRecord(laboratory : Laboratory) {
    this.laboratoryService.deleteLaboratory(laboratory.id).subscribe({
      next: (result: boolean) => {
        result;
        this.laboratoryList.forEach(element => {
          if (laboratory.id == element.id) {
            element.status = false;
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevLaboratory = this.laboratoryList.filter(x => x.status);
      }
    });
  }
  batchdeleteLaboratory() {
    if (this.selectedLaboratory.length > 0) {
      console.log(this.selectedLaboratory)
      this.selectedLaboratory.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.laboratoryService.batchdeleteLaboratory(this.selectedLaboratory).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.laboratoryList.forEach(val => {
              let x = this.selectedLaboratory.find(x => x.id == val.id);
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
          this.prevLaboratory = this.laboratoryList.filter(x => x.status);
        }
      });
    }
  }
}