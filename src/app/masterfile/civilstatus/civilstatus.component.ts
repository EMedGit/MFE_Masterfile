import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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
  searchkey:""
  ref: DynamicDialogRef;
  civilstatus: CivilStatus;
  prevCivilStatusList: CivilStatus[];
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
        this.prevCivilStatusList = this.civilstatusList.filter(x=>x.status);
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
    let filter:any[]=[];
    this.civilstatusList.forEach(val => {
      console.log(val)
      if(val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status)
      {
        filter.push(val);
      }
      
    });
    console.log(filter)
    this.prevCivilStatusList = filter;

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
    this.ref.onClose.subscribe((data:CivilStatus)=>{
      if(data!=undefined)
      {
        this.civilstatusList.push(data);
        this.prevCivilStatusList = this.civilstatusList.filter(x=>x.status);
      }
    })
  }
  updateCivilStatusPopUp(civilStatus: CivilStatus) {
    this.ref = this.dialogService.open(PopupCivilstatusComponent, {
      width: '1200px',
      height: '430px',
      showHeader: false,
      closable: true,
      data: {
        civilStatus,
        isForUpdating:true
      }    
    })
    this.ref.onClose.subscribe((data:CivilStatus)=>{

      if(data!=undefined)
      {
        this.civilstatusList.forEach(val => {
          if(val.id==data.id)
          {
           val.code = data.code;
           val.description = data.description;
           val.status = data.status;
           val.createdBy = data.createdBy;
           val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevCivilStatusList = this.civilstatusList.filter(x=>x.status);
      }
    })
  }
  removeCivilStatusRecord(civilStatus: CivilStatus){
    this.civilstatusService.deleteCivilStatus(civilStatus.id).subscribe({
      next : (result : boolean) => {
        result;
        this.civilstatusList.forEach(element => {
          if(civilStatus.id ==element.id)
          {
            element.status = false;
          }
          
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevCivilStatusList = this.civilstatusList.filter(x=>x.status);
      }

    });
  }
}
