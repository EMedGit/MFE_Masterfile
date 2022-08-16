import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChiefComplaintDetail } from 'src/app/models/chiefcomplaintdetail.model';
import { ChiefcomplaintdetailService } from 'src/app/services/chiefcomplaintdetail.service';
import { PopupChiefcomplaintdetailComponent } from '../popup/popup-chiefcomplaintdetail/popup-chiefcomplaintdetail.component';

@Component({ 
  selector: 'app-chiefcomplaintdetail',
  templateUrl: './chiefcomplaintdetail.component.html',
  styleUrls: ['./chiefcomplaintdetail.component.css'],
  providers: [DialogService]
})
export class ChiefcomplaintdetailComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  chiefcomplaintdetail : ChiefComplaintDetail;
  prevChiefComplaintDetail : ChiefComplaintDetail[];
  chiefcomplaintdetailList : ChiefComplaintDetail[];
  selectedChiefComplaintDetail : ChiefComplaintDetail[];

  constructor(private chiefcomplaintdetailService : ChiefcomplaintdetailService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.chiefcomplaintdetailService.getChiefcomplaintdetail().subscribe({
      next: (result: ChiefComplaintDetail[]) => {
        this.chiefcomplaintdetailList = result;
        this.prevChiefComplaintDetail = this.chiefcomplaintdetailList.filter(x => x.status);
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
    console.log(this.selectedChiefComplaintDetail)
    let filter: any[] = [];
    this.chiefcomplaintdetailList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    this.prevChiefComplaintDetail = filter;
  }
  addChiefComplaintDetailPopup() {
    this.ref = this.dialogService.open(PopupChiefcomplaintdetailComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ChiefComplaintDetail) => {
      if (data != undefined) {
        this.chiefcomplaintdetailList.push(data);
        this.prevChiefComplaintDetail = this.chiefcomplaintdetailList.filter(x => x.status);
      }
    })
  }
  updateChiefComplaintDetailPopUp(chiefcomplaintdetail: ChiefComplaintDetail) {
    this.ref = this.dialogService.open(PopupChiefcomplaintdetailComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        chiefcomplaintdetail,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: ChiefComplaintDetail) => {

      if (data != undefined) {
        this.chiefcomplaintdetailList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevChiefComplaintDetail = this.chiefcomplaintdetailList.filter(x => x.status);
      }
    })
  }
  removeChiefComplaintDetailRecord(chiefcomplaintdetail: ChiefComplaintDetail) {
    this.chiefcomplaintdetailService.deleteChiefcomplaintdetail(chiefcomplaintdetail.id).subscribe({
      next: (result: boolean) => {
        result;
        this.chiefcomplaintdetailList.forEach(element => {
          if (chiefcomplaintdetail.id == element.id) {
            element.status = false;
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevChiefComplaintDetail = this.chiefcomplaintdetailList.filter(x => x.status);
      }
    });
  }
  batchdeleteChiefComplaintDetail() {
    if (this.selectedChiefComplaintDetail.length > 0) {
      console.log(this.selectedChiefComplaintDetail)
      this.selectedChiefComplaintDetail.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.chiefcomplaintdetailService.batchdeleteChiefcomplaintdetail(this.selectedChiefComplaintDetail).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.chiefcomplaintdetailList.forEach(val => {
              let x = this.selectedChiefComplaintDetail.find(x => x.id == val.id);
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
          this.prevChiefComplaintDetail = this.chiefcomplaintdetailList.filter(x => x.status);
        }
      });
    }
  }
}
