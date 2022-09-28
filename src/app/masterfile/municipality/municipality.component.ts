import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Municipality } from 'src/app/models/municipality.model';
import { AddressService } from 'src/app/services/address.service';
import { PopupMunicipalityComponent } from '../popup/popup-municipality/popup-municipality.component';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class MunicipalityComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  municipality: Municipality;
  prevMunicipalityList: Municipality[] = [];
  municipalityList: Municipality[];
  selectedMunicipality: Municipality[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private addressService: AddressService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.addressService.getMunicipality().subscribe({
      next: (result: Municipality[]) => {
        this.municipalityList = result;
        this.prevMunicipalityList = this.municipalityList.filter(x => x.status);
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
    console.log(this.selectedMunicipality)
    let filter: any[] = [];
    this.municipalityList.forEach(val => {
      console.log(val)
      if (val.municipalityName.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    console.log(filter)
    this.prevMunicipalityList = filter;
  }
  addMunicipalityPopup() {
    this.ref = this.dialogService.open(PopupMunicipalityComponent, {
      width: '1000px',
      height: '350px',
      showHeader: true,
      closable: false,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Municipality) => {
      if (data != undefined) {
        this.municipalityList.push(data);
        this.prevMunicipalityList = this.municipalityList.filter(x => x.status);
      }
    })
  }
  batchdeleteMunicipality() {
    if (this.selectedMunicipality.length > 0) {
      this.selectedMunicipality.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.addressService.batchdeleteMunicipality(this.selectedMunicipality).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.municipalityList.forEach(val => {
              let x = this.selectedMunicipality.find(x => x.id == val.id);
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
          this.prevMunicipalityList = this.municipalityList.filter(x => x.status);
        }
      });
    }
  }
  updateMunicipalityPopUp(municipality: Municipality) {
    this.ref = this.dialogService.open(PopupMunicipalityComponent, {
      width: '1000px',
      height: '350px',
      showHeader: true,
      closable: false,
      data: {
        municipality,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Municipality) => {

      if (data != undefined) {
        this.municipalityList.forEach(val => {
          if (val.id == data.id) {
            val.municipalityCode = data.municipalityCode;
            val.municipalityName = data.municipalityName;
            val.provinceCode = data.provinceCode;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevMunicipalityList = this.municipalityList.filter(x => x.status);
      }
    })
  }
  removeMunicipalityRecord(municipality: Municipality) {
    if (municipality != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.addressService.deleteMunicipality(municipality.id).subscribe({
            next: (result: boolean) => {
              result;
              this.municipalityList.forEach(element => {
                if (municipality.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevMunicipalityList = this.municipalityList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}
