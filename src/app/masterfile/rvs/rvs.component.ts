import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RVS } from 'src/app/models/rvs.model';
import { RVSService } from 'src/app/services/rvs.service';
import { PopupRvsComponent } from '../popup/popup-rvs/popup-rvs.component';

@Component({
  selector: 'app-rvs',
  templateUrl: './rvs.component.html',
  styleUrls: ['./rvs.component.css'],
  providers: [DialogService]
})
export class RvsComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  rvs: RVS;
  rvsList: RVS[];
  selectedRVSList: RVS[];
  newRVSList:  RVS[];

  constructor(private rvsService: RVSService, private dialogService: DialogService) { }

  ngOnInit(): void {
    //this.rvsService.getRVS().then(data => this.rvsList = data);
    this.getData();
  }

  filter() {
    let filter: any[] = [];
    this.rvsList.forEach(val => {
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newRVSList = filter;
  }
  getData() {
    this.rvsService.get('','',0,100).subscribe({
      next: (result: RVS[]) => {
        this.rvsList = result;
        this.newRVSList = this.rvsList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  addRVSPopup() {
    this.ref = this.dialogService.open(PopupRvsComponent, {
      width: '1000px',
      height: '620px',
      showHeader: true,
      closable: true,
      data: {
        rvs: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: RVS) => {
      if (data != undefined) {
        this.rvsList.push(data);
        this.newRVSList = this.rvsList.filter(x => x.status);
      }
    })
  }

  updateRVSPopUp(rvs: RVS){
    this.ref = this.dialogService.open(PopupRvsComponent, {
      width: '1000px',
      height: '620px',
      showHeader: true,
      closable: true,
      data: {
        rvs,
        isForUpdating: true
      }
      
    })
    this.ref.onClose.subscribe((data: RVS) => {
      if (data != undefined) {
        this.rvsList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newRVSList = this.rvsList.filter(x => x.status);
      }
    })
  }

  remove(rvs : RVS) {
    this.rvsService.delete(rvs.id).subscribe({
      next : (result : boolean) => {
        result;
        this.rvsList.forEach(element => {
          if (rvs.id == element.id)
          {
            element.status = false;
          }
        });
      },
      error : (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.newRVSList = this.rvsList.filter(x => x.status);
      }
    });
  }


}
