import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientType } from 'src/app/models/patienttype.model';
import { PatienttypeService } from 'src/app/services/patienttype.service';
import { PopupPatienttypeComponent } from '../popup/popup-patienttype/popup-patienttype.component';

@Component({
  selector: 'app-patienttype',
  templateUrl: './patienttype.component.html',
  styleUrls: ['./patienttype.component.css'],
  providers: [DialogService]
})
export class PatienttypeComponent implements OnInit {
  searchkey: ""
  ref : DynamicDialogRef;
  patientType : PatientType;
  prevPatientTypeList : PatientType[];
  patienttypeList : PatientType[];
  selectedPatientType : PatientType[];

  constructor(private patienttypeService : PatienttypeService, private dialogService : DialogService, private datePipe : DatePipe ) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.patienttypeService.getPatientType().subscribe({
      next : (result : PatientType[]) => {
        this.patienttypeList = result;
        this.prevPatientTypeList = this.patienttypeList.filter(x => x.status);
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {
        console.log('complete');
      }
    })
  }

  filter(){
    let filter : any[] = [];
    this.patienttypeList.forEach(val => {
      if(val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status)
      {
        filter.push(val);
      }
    });
    this.prevPatientTypeList = filter;
  }
  addPatientTypePopup(){
    this.ref = this.dialogService.open(PopupPatienttypeComponent, {
      width: '1200px',
      height: '380px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data: PatientType) => {
      if (data != undefined) {
        this.patienttypeList.push(data);
        this.prevPatientTypeList = this.patienttypeList.filter(x => x.status);
      }
    });
  }
  updatePatientTypePopUp(patienttype : PatientType){
    this.ref = this.dialogService.open(PopupPatienttypeComponent, {
      width: '1200px',
      height: '480px',
      showHeader: true,
      closable: true,
      data: {
        patienttype,
        isForUpdating: true
      }
    });
    this.ref.onClose.subscribe((data : PatientType) => {
        if(data != undefined){
          this.patienttypeList.forEach(val => {
            if(val.id == data.id){
              val.description = data.description;
              val.status = data.status;
              val.createdBy = data.createdBy;
              val.createdDateTime = data.createdDateTime;
            }
          });
          this.prevPatientTypeList = this.patienttypeList.filter(x => x.status);
        }
    });
  }
  removePatientTypeRecord(patienttype : PatientType){
    this.patienttypeService.deletePatientType(patienttype.id).subscribe({
      next : (result : boolean) => {
        result;
        this.patienttypeList.forEach(element => {
          if(patienttype.id == element.id){
            element.status = false;
          }
        });
      },
      error : (err : any) => {
        console.log(err);
      },
      complete : () => {
        console.log('complete');
        this.prevPatientTypeList = this.patienttypeList.filter(x => x.status);
      }
    });
  }
  batchdeletePatientType(){
    if(this.selectedPatientType.length > 0){
        this.selectedPatientType.forEach(val => {
          val.modifiedBy = '';
          val.modifiedDateTime = this.datePipe.transform(
            new Date(), 'yyyy-MM-ddTHH:mm:ss'
          ) as string;
          val.status = false;
        });
        this.patienttypeService.batchdeletePatientType(this.selectedPatientType).subscribe({
          next : (result : boolean) => {
            if(result) {
              this.patienttypeList.forEach(val => {
                let x = this.selectedPatientType.find(x => x.id == val.id);
                if(x != undefined && x != null){
                  val.status = false;
                }
              });
            }
          },
          error : (err : any) => {
            console.log(err);
          },
          complete : () => {
            console.log('complete');
            this.prevPatientTypeList = this.patienttypeList.filter(x => x.status);
          }
        });
    }
  }
}
