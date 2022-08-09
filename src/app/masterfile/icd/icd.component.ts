import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICD10 } from 'src/app/models/icd10.model';
import { ICD10Service } from 'src/app/services/icd10.service';
import { PopupIcdComponent } from '../popup/popup-icd/popup-icd.component';

@Component({
  selector: 'app-icd',
  templateUrl: './icd.component.html',
  styleUrls: ['./icd.component.css'],
  providers: [DialogService]
})
export class IcdComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  icd: ICD10;
  icd10List: ICD10[];  
  selectedICD10List: ICD10[];
  newICD10List: ICD10[];
 
  constructor(private icd10Service: ICD10Service,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    //this.icd10Service.getProducts().then(data => this.icd10List = data);
    this.getData();
  }

  getData() {
    this.icd10Service.get('','',0,100).subscribe({
      next: (result: ICD10[]) => {
        this.icd10List = result;
        this.newICD10List = this.icd10List.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  filter(value: any){
    this.newICD10List.every(a => a.description?.includes(value.key));
  }
  
  addICDPopup() {
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '550px',
      showHeader: true,
      closable: true,
      data: {
        icd10: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ICD10) => {
      if (data != undefined) {
        this.icd10List.push(data);
        this.newICD10List = this.icd10List.filter(x => x.status);
      }
    })
  }

  updateICDPopUp(icd: ICD10){
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '550px',
      showHeader: true,
      closable: true,
      data: {
        icd,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: ICD10) => {
      if (data != undefined) {
        this.icd10List.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newICD10List = this.icd10List.filter(x => x.status);
      }
    })
  }

  remove(icd10: ICD10) {
    this.icd10Service.delete(icd10.id).subscribe({
      next : (result : boolean) => {
        result;
        this.icd10List.forEach(element => {
          if (icd10.id == element.id)
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
        this.newICD10List = this.icd10List.filter(x => x.status);
      }
    });
  }

}
