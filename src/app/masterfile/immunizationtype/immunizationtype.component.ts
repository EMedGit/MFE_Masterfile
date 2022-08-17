import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImmunizationType } from 'src/app/models/immunizationtype.model';
import { ImmunizationTypeService } from 'src/app/services/immunizationtype.service';
import { PopupImmunizationtypeComponent } from '../popup/popup-immunizationtype/popup-immunizationtype.component';

@Component({
  selector: 'app-immunizationtype',
  templateUrl: './immunizationtype.component.html',
  styleUrls: ['./immunizationtype.component.css'],
  providers: [DialogService]
})
export class ImmunizationtypeComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  immunizationType: ImmunizationType;
  immunizationTypeList: ImmunizationType[];
  selectedImmunizationTypeList: ImmunizationType[];
  newImmunizationTypeList: ImmunizationType[];

  constructor(private itService: ImmunizationTypeService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.itService.get('','',0,10000).subscribe({
      next: (result: ImmunizationType[]) => {
        this.immunizationTypeList = result;
        this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
      }, 
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
        console.log(this.newImmunizationTypeList);
      }
    })
  }

  filter() {
    console.log(this.selectedImmunizationTypeList)
    let filter: any[] = [];
    this.newImmunizationTypeList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newImmunizationTypeList = filter;
  }


  addPopup(){
    this.dialogService.open(PopupImmunizationtypeComponent, {
    width: '1000px',
    height: '430px',
    showHeader: true,
    closable: true,
    data: {
      immunizationType: {},
      isForSaving: true
    }
  })
  this.ref.onClose.subscribe((data: ImmunizationType) => {
    if (data != undefined) {
      this.immunizationTypeList.push(data);
      this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
    }
  })

}

updatePopUp(immunizationType : ImmunizationType){
  this.dialogService.open(PopupImmunizationtypeComponent, {
    width: '1000px',
    height: '450px',
    showHeader: true,
    closable: true,
    data: {
      immunizationType,
      isForUpdating: true
    }
  })
  this.ref.onClose.subscribe((data: ImmunizationType) => {
    if (data != undefined) {
      this.immunizationTypeList.forEach(val => {
        if (val.id == data.id) {
          val.code = data.code;
          val.description = data.description;
          val.status = data.status;
          val.createdBy = data.createdBy;
          val.createdDateTime = data.createdDateTime;
        }
      });
      this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
      }
    })
  }


  remove(immunizationType : ImmunizationType) {
    this.itService.delete(immunizationType.id).subscribe({
      next : (result : boolean) => {
        result;
        this.immunizationTypeList.forEach(element => {
          if (immunizationType.id == element.id)
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
        this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
      }
    });
  }

}

