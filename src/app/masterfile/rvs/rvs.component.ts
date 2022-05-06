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
  ref: DynamicDialogRef;
  rvsList: RVS[];
  rvs: RVS;

  selectedRVS: RVS[];

  constructor(private rvsService: RVSService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.rvsService.getRVS().then(data => this.rvsList = data);
  }

  addRVSPopup() {
    this.ref = this.dialogService.open(PopupRvsComponent, {
      width: '1000px',
      height: '520px',
      showHeader: false,
      data: {
        rvs: {},
        isForSaving: true
      }
    })
  }

  updateRVSPopUp(rvs: RVS){
    this.ref = this.dialogService.open(PopupRvsComponent, {
      width: '1000px',
      height: '520px',
      showHeader: false,
      data: {
        rvs,
        isForUpdating: true
      }
      
    })
  }

}
