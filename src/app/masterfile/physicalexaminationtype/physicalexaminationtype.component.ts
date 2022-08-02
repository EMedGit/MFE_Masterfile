import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationType } from 'src/app/models/physicalexaminationtype.model';
import { PhysicalExaminationTypeService } from 'src/app/services/physicalexaminationtype.service';
import { PopupPhysicalexaminationtypeComponent } from '../popup/popup-physicalexaminationtype/popup-physicalexaminationtype.component';

@Component({
  selector: 'app-physicalexaminationtype',
  templateUrl: './physicalexaminationtype.component.html',
  styleUrls: ['./physicalexaminationtype.component.css'],
  providers: [DialogService]
})
export class PhysicalexaminationtypeComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  physicalExaminationType: PhysicalExaminationType;
  physicalExaminationTypes: PhysicalExaminationType[];
  selectedphysicalExaminationTypes: PhysicalExaminationType[];
  newphysicalExaminationTypesList: PhysicalExaminationType[];

  constructor(private physicalExaminationTypeService : PhysicalExaminationTypeService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.physicalExaminationTypeService.get('',0,100).subscribe({
      next: (result: PhysicalExaminationType[]) => {
        this.physicalExaminationTypes = result;
        this.newphysicalExaminationTypesList = this.physicalExaminationTypes.filter(x => x.status);
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  filter() {
    console.log(this.selectedphysicalExaminationTypes)
    let filter: any[] = [];
    this.newphysicalExaminationTypesList.forEach(val => {
      console.log(val)
      if (val.type.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newphysicalExaminationTypesList = filter;
  }

  addPopup()
  {
    this.ref = this.dialogService.open(PopupPhysicalexaminationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: true,
      data: {
        physicalExaminationType: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationType) => {
      if (data != undefined) {
        this.physicalExaminationTypes.push(data);
        this.newphysicalExaminationTypesList = this.physicalExaminationTypes.filter(x => x.status);
      }
    })
  }

  updatePopup(physicalExaminationType : PhysicalExaminationType) {
    this.dialogService.open(PopupPhysicalexaminationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      data: {
        physicalExaminationType,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationType) => {
      if (data != undefined) {
        this.physicalExaminationTypes.forEach(val => {
          if (val.id == data.id) {
            val.type = data.type;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newphysicalExaminationTypesList = this.physicalExaminationTypes.filter(x => x.status);
      }
    })
  }

  remove(physicalExaminationType : PhysicalExaminationType) {
    this.physicalExaminationTypeService.delete(physicalExaminationType.id).subscribe({
      next : (result : boolean) => {
        result;
        this.physicalExaminationTypes.forEach(element => {
          if (physicalExaminationType.id == element.id)
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
        this.newphysicalExaminationTypesList = this.physicalExaminationTypes.filter(x => x.status);
      }
    });
  }


}
