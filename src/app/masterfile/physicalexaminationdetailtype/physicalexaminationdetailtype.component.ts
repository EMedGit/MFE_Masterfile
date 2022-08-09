import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationDetailType } from 'src/app/models/physicalexaminationdetailtype.model';
import { PhysicalExaminationDetailTypeService } from 'src/app/services/physicalexaminationdetailtype.service';
import { PopupPhysicalexaminationdetailtypeComponent } from '../popup/popup-physicalexaminationdetailtype/popup-physicalexaminationdetailtype.component';

@Component({
  selector: 'app-physicalexaminationdetailtype',
  templateUrl: './physicalexaminationdetailtype.component.html',
  styleUrls: ['./physicalexaminationdetailtype.component.css'],
  providers: [DialogService]
})
export class PhysicalexaminationdetailtypeComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  physicalExaminationDetailType: PhysicalExaminationDetailType;
  physicalExaminationDetailTypes: PhysicalExaminationDetailType[];
  selectedphysicalExaminationDetailTypes: PhysicalExaminationDetailType[];
  newphysicalExaminationDetailTypesList: PhysicalExaminationDetailType[];

  constructor(private physicalExaminationDetailTypeService : PhysicalExaminationDetailTypeService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.physicalExaminationDetailTypeService.get(0,'','',0,100).subscribe({
      next: (result: PhysicalExaminationDetailType[]) => {
        this.physicalExaminationDetailTypes = result;
        this.newphysicalExaminationDetailTypesList = this.physicalExaminationDetailTypes.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  filter() {
    console.log(this.selectedphysicalExaminationDetailTypes)
    let filter: any[] = [];
    this.newphysicalExaminationDetailTypesList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newphysicalExaminationDetailTypesList = filter;
  }

  addPopup()
  {
    this.ref = this.dialogService.open(PopupPhysicalexaminationdetailtypeComponent, {
      width: '1000px',
      height: '650px',
      showHeader: true,
      header: 'PHYSICAL EXAMINATION DETAIL TYPE',
      closable: true,
      data: {
        physicalExaminationDetailType: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationDetailType) => {
      if (data != undefined) {
        this.physicalExaminationDetailTypes.push(data);
        this.newphysicalExaminationDetailTypesList = this.physicalExaminationDetailTypes.filter(x => x.status);
      }
    })
  }

  updatePopup(physicalExaminationDetailType : PhysicalExaminationDetailType) {
    this.dialogService.open(PopupPhysicalexaminationdetailtypeComponent, {
      width: '1000px',
      height: '650px',
      showHeader: true,
      header: 'PHYSICAL EXAMINATION DETAIL TYPE',
      data: {
        physicalExaminationDetailType,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationDetailType) => {
      if (data != undefined) {
        this.physicalExaminationDetailTypes.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.physicalExaminationTypeId = data.physicalExaminationTypeId;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newphysicalExaminationDetailTypesList = this.physicalExaminationDetailTypes.filter(x => x.status);
      }
    })
  }


  remove(physicalExaminationDetailType : PhysicalExaminationDetailType) {
    this.physicalExaminationDetailTypeService.delete(physicalExaminationDetailType.id).subscribe({
      next : (result : boolean) => {
        result;
        this.physicalExaminationDetailTypes.forEach(element => {
          if (physicalExaminationDetailType.id == element.id)
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
        this.newphysicalExaminationDetailTypesList = this.physicalExaminationDetailTypes.filter(x => x.status);
      }
    });
  }





}
