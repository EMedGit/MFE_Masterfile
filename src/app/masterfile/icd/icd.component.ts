import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICD10 } from 'src/app/models/icd10.model';
import { ICD10Service } from 'src/app/services/icd10.service';
import { PopupIcdComponent } from '../popup/popup-icd/popup-icd.component';

@Component({
  selector: 'app-icd',
  templateUrl: './icd.component.html',
  styleUrls: ['./icd.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class IcdComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  icd: ICD10;
  icd10List: ICD10[];
  selectedICD10List: ICD10[];
  newICD10List: ICD10[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private icd10Service: ICD10Service,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.icd10Service.get().subscribe({
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

  filter() {
    let filter: any[] = [];
    console.log(this.icd10List,'hello')
    this.icd10List.forEach(val => {
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newICD10List = filter;
    console.log(this.newICD10List,'hello')
  }

  addICDPopup() {
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      closable: false,
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

  updateICDPopUp(icd: ICD10) {
    this.ref = this.dialogService.open(PopupIcdComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      closable: false,
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
    if (icd10 != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.icd10Service.delete(icd10.id).subscribe({
            next: (result: boolean) => {
              result;
              this.icd10List.forEach(element => {
                if (icd10.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.newICD10List = this.icd10List.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}
