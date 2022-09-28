import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImmunizationType } from 'src/app/models/immunizationtype.model';
import { ImmunizationTypeService } from 'src/app/services/immunizationtype.service';
import { PopupImmunizationtypeComponent } from '../popup/popup-immunizationtype/popup-immunizationtype.component';

@Component({
  selector: 'app-immunizationtype',
  templateUrl: './immunizationtype.component.html',
  styleUrls: ['./immunizationtype.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ImmunizationtypeComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  immunizationType: ImmunizationType;
  immunizationTypeList: ImmunizationType[];
  selectedImmunizationTypeList: ImmunizationType[];
  newImmunizationTypeList: ImmunizationType[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private itService: ImmunizationTypeService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.itService.getImmunizationType().subscribe({
      next: (result: ImmunizationType[]) => {
        this.immunizationTypeList = result;
        this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  filter() {
    let filter: any[] = [];
    this.immunizationTypeList.forEach(val => {
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newImmunizationTypeList = filter;
  }


  addPopup() {
    this.ref = this.dialogService.open(PopupImmunizationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
      data: {
        // immunizationType: {},
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data: ImmunizationType) => {
      if (data != undefined) {
        this.immunizationTypeList.push(data);
        this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
      }
    });

  }

  updatePopUp(immunizationType: ImmunizationType) {
    this.dialogService.open(PopupImmunizationtypeComponent, {
      width: '1000px',
      height: '400px',
      showHeader: true,
      closable: false,
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
  remove(immunizationType: ImmunizationType) {
    if (immunizationType != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.itService.delete(immunizationType.id).subscribe({
            next: (result: boolean) => {
              result;
              this.immunizationTypeList.forEach(element => {
                if (immunizationType.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.newImmunizationTypeList = this.immunizationTypeList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}

