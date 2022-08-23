import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillaryDepartment } from 'src/app/models/ancillarydepartment.model';
import { AncillarydepartmentService } from 'src/app/services/ancillarydepartment.service';
import { PopupAncillarydepartmentComponent } from '../popup/popup-ancillarydepartment/popup-ancillarydepartment.component';

@Component({
  selector: 'app-ancillarydepartment',
  templateUrl: './ancillarydepartment.component.html',
  styleUrls: ['./ancillarydepartment.component.css'],
  providers: [DialogService]
})
export class AncillarydepartmentComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  ancillarydepartment : AncillaryDepartment;
  prevAncillaryDepartmentList : AncillaryDepartment[];
  ancillarydepartmentList : AncillaryDepartment[];
  selectedAncillaryDepartment : AncillaryDepartment[];
  
  constructor(private ancillarydepartmentService : AncillarydepartmentService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.ancillarydepartmentService.getAncillaryDepartment().subscribe({
      next: (result: AncillaryDepartment[]) => {
        this.ancillarydepartmentList = result;
        this.prevAncillaryDepartmentList = this.ancillarydepartmentList.filter(x => x.status);
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
    console.log(this.selectedAncillaryDepartment)
    let filter: any[] = [];
    this.ancillarydepartmentList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevAncillaryDepartmentList = filter;
  }
  addAncillaryDepartmentPopup() {
    this.ref = this.dialogService.open(PopupAncillarydepartmentComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: AncillaryDepartment) => {
      if (data != undefined) {
        this.ancillarydepartmentList.push(data);
        this.prevAncillaryDepartmentList = this.ancillarydepartmentList.filter(x => x.status);
      }
    })
  }
  updateAncillaryDepartmentPopUp(ancillarydepartment: AncillaryDepartment) {
    this.ref = this.dialogService.open(PopupAncillarydepartmentComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        ancillarydepartment,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: AncillaryDepartment) => {

      if (data != undefined) {
        this.ancillarydepartmentList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevAncillaryDepartmentList = this.ancillarydepartmentList.filter(x => x.status);
      }
    })
  }
  removeAncillaryDepartmentRecord(ancillarydepartment: AncillaryDepartment) {
    this.ancillarydepartmentService.deleteAncillaryDepartment(ancillarydepartment.id).subscribe({
      next: (result: boolean) => {
        result;
        this.ancillarydepartmentList.forEach(element => {
          if (ancillarydepartment.id == element.id) {
            element.status = false;
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevAncillaryDepartmentList = this.ancillarydepartmentList.filter(x => x.status);
      }
    });
  }
  batchdeleteAncillaryDepartment() {
    if (this.selectedAncillaryDepartment.length > 0) {
      console.log(this.selectedAncillaryDepartment)
      this.selectedAncillaryDepartment.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.ancillarydepartmentService.batchdeleteAncillaryDepartment(this.selectedAncillaryDepartment).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.ancillarydepartmentList.forEach(val => {
              let x = this.selectedAncillaryDepartment.find(x => x.id == val.id);
              if (x != undefined && x != null) {
                val.status = false;
              }
            });
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
          this.prevAncillaryDepartmentList = this.ancillarydepartmentList.filter(x => x.status);
        }
      });
    }
  }
}