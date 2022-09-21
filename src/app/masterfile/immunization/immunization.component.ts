import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Immunization } from 'src/app/models/immunization.model';
import { ImmunizationService } from 'src/app/services/immunization.service';
import { PopupImmunizationComponent } from '../popup/popup-immunization/popup-immunization.component';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css'],
  providers: [DialogService]
})
export class ImmunizationComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  immunization: Immunization;
  immunizationList: Immunization[];
  selectedImmunizationList: Immunization[];
  newImmunizationList: Immunization[];

  constructor(private immunizationService: ImmunizationService, private dialogService: DialogService ) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.immunizationService.getImmunization('','',0,0,100).subscribe({
      next: (result: Immunization[]) => {
        this.immunizationList = result;
        this.newImmunizationList = this.immunizationList.filter(x => x.status);
      }, 
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  filter() {
    console.log(this.selectedImmunizationList)
    let filter: any[] = [];
    this.immunizationList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newImmunizationList = filter;
  }

  addImmunizationPopup(){
    this.ref = this.dialogService.open(PopupImmunizationComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      closable: true,
      data: {
        immunization: {},
        isForSaving: true
      }
    })

    this.ref.onClose.subscribe((data: Immunization) => {
      if (data != undefined) {
        this.immunizationList.push(data);
        this.newImmunizationList = this.immunizationList.filter(x => x.status);
      }
    })

  }

  updateImmunizationPopUp(immunization : Immunization){
    this.ref = this.dialogService.open(PopupImmunizationComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      closable: true,
      data: {
        immunization,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Immunization) => {
      if (data != undefined) {
        this.immunizationList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newImmunizationList = this.immunizationList.filter(x => x.status);
      }
    })

  }

  remove(immunization : Immunization) {
    this.immunizationService.delete(immunization.id).subscribe({
      next : (result : boolean) => {
        result;
        this.immunizationList.forEach(element => {
          if (immunization.id == element.id)
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
        this.newImmunizationList = this.immunizationList.filter(x => x.status);
      }
    });
  }

  
}
