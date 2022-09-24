import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationDetail } from 'src/app/models/physicalexaminationdetail.model';
import { PhysicalExaminationDetailService } from 'src/app/services/physicalexaminationdetail.service';
import { PopupPhysicalexaminationdetailComponent } from '../popup/popup-physicalexaminationdetail/popup-physicalexaminationdetail.component';

@Component({
  selector: 'app-physicalexaminationdetail',
  templateUrl: './physicalexaminationdetail.component.html',
  styleUrls: ['./physicalexaminationdetail.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class PhysicalexaminationdetailComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  physicalExaminationDetail: PhysicalExaminationDetail;
  physicalExaminationDetails: PhysicalExaminationDetail[];
  selectedphysicalExaminationDetails: PhysicalExaminationDetail[];
  newphysicalExaminationDetailsList: PhysicalExaminationDetail[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private physicalExaminationDetailService: PhysicalExaminationDetailService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.physicalExaminationDetailService.get(0, 0, '', '', 0, 100).subscribe({
      next: (result: PhysicalExaminationDetail[]) => {
        this.physicalExaminationDetails = result;
        this.newphysicalExaminationDetailsList = this.physicalExaminationDetails.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }

  filter() {
    console.log(this.selectedphysicalExaminationDetails)
    let filter: any[] = [];
    this.newphysicalExaminationDetailsList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newphysicalExaminationDetailsList = filter;
  }


  addPopup() {
    this.ref = this.dialogService.open(PopupPhysicalexaminationdetailComponent, {
      width: '1000px',
      height: '650px',
      showHeader: true,
      closable: true,
      data: {
        physicalExaminationDetail: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationDetail) => {
      if (data != undefined) {
        this.physicalExaminationDetails.push(data);
        this.newphysicalExaminationDetailsList = this.physicalExaminationDetails.filter(x => x.status);
      }
    })
  }

  updatePopup(physicalExaminationDetail: PhysicalExaminationDetail) {
    this.dialogService.open(PopupPhysicalexaminationdetailComponent, {
      width: '1000px',
      height: '650px',
      showHeader: true,
      data: {
        physicalExaminationDetail,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationDetail) => {
      if (data != undefined) {
        this.physicalExaminationDetails.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newphysicalExaminationDetailsList = this.physicalExaminationDetails.filter(x => x.status);
      }
    })
  }

  remove(physicalExaminationDetail: PhysicalExaminationDetail) {
    if (physicalExaminationDetail != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.physicalExaminationDetailService.delete(physicalExaminationDetail.id).subscribe({
            next: (result: boolean) => {
              result;
              this.physicalExaminationDetails.forEach(element => {
                if (physicalExaminationDetail.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('delete complete');
              this.newphysicalExaminationDetailsList = this.physicalExaminationDetails.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}
