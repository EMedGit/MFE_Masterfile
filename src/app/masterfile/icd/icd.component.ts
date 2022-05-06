import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICD10 } from 'src/app/models/masterfile.model';
import { ICD10Service } from 'src/app/services/icd10.service';
import { PopupIcdComponent } from '../popup/popup-icd/popup-icd.component';


@Component({
  selector: 'app-icd',
  templateUrl: './icd.component.html',
  styleUrls: ['./icd.component.css'],
  providers: [DialogService]
})
export class IcdComponent implements OnInit {

  ref: DynamicDialogRef;
  icd10s: ICD10[];
  icd10: ICD10;
  
  selectedICD10s: ICD10[];
 
  constructor(private icd10Service: ICD10Service,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.icd10Service.getProducts().then(data => this.icd10s = data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  filter(value: any){
    this.icd10s.every(a => a.description?.includes(value.key));
  }
  
  addICDPopup() {
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '450px',
      showHeader: false,
      closable: true,
      data: {
        icd: {},
        isForSaving: true
      }
    })
  }

  updateICDPopUp(icd: ICD10){
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '450px',
      showHeader: false,
      data: {
        icd,
        isForUpdating: true
      }
    })
  }

}
