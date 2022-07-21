import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CivilStatus } from 'src/app/models/civilstatus.model';
import { CivilstatusService } from 'src/app/services/civilstatus.service';
import { PopupCivilstatusComponent } from '../popup/popup-civilstatus/popup-civilstatus.component';

@Component({
  selector: 'app-civilstatus',
  templateUrl: './civilstatus.component.html',
  styleUrls: ['./civilstatus.component.css'],
  providers: [DialogService]
})
export class CivilstatusComponent implements OnInit {

  ref: DynamicDialogRef;
  civilstatus: CivilStatus;
  civilstatusList: CivilStatus[];
  selectedCivilStatus: CivilStatus[];

  constructor(private civilstatusService: CivilstatusService, private dialogService : DialogService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {

    this.civilstatusService.getCivilStatus().subscribe({
      next: (result : CivilStatus[]) => {
        this.civilstatusList = result;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  filter(value: any) {
    this.civilstatusList.every(a => a.description?.includes(value.key));
  }

  addCivilStatusPopup() {
    this.ref = this.dialogService.open(PopupCivilstatusComponent, {
      width: '1200px',
      height: '430px',
      showHeader: false,
      closable: true,
      data: {
        isForSaving: true
      }
    })
  }
  updateImmunizationPopUp(civilStatus: CivilStatus) {

  }
}
