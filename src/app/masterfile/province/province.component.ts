import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/models/province.model';
import { Region } from 'src/app/models/region.model';
import { AddressService } from 'src/app/services/address.service';
import { PopupProvinceComponent } from '../popup/popup-province/popup-province.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ProvinceComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  province: Province;
  prevProvinceList: Province[];
  provinceList: Province[];
  selectedProvince: Province[];
  regions: Region[];
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private addressService: AddressService, private dialogService: DialogService, private confirmationService: ConfirmationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.addressService.getProvince().subscribe({
      next: (result: Province[]) => {
        this.provinceList = result;
        this.prevProvinceList = this.provinceList.filter(x => x.status);
        console.log(this.provinceList, 'hey');
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
    console.log(this.selectedProvince)
    let filter: any[] = [];
    this.provinceList.forEach(val => {
      console.log(val)
      if (val.provinceName.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    console.log(filter)
    this.prevProvinceList = filter;
  }
  addProvincePopup() {
    this.ref = this.dialogService.open(PopupProvinceComponent, {
      width: '1200px',
      height: '530px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Province) => {
      if (data != undefined) {
        this.provinceList.push(data);
        this.prevProvinceList = this.provinceList.filter(x => x.status);
        console.log(this.provinceList, 'xx');
      }
    })
  }
  batchdeleteProvince() {
    if (this.selectedProvince.length > 0) {
      this.selectedProvince.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.addressService.batchdeleteProvince(this.selectedProvince).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.provinceList.forEach(val => {
              let x = this.selectedProvince.find(x => x.id == val.id);
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
          this.prevProvinceList = this.provinceList.filter(x => x.status);
        }
      });
    }
  }
  updateProvincePopUp(province: Province) {
    this.ref = this.dialogService.open(PopupProvinceComponent, {
      width: '1200px',
      height: '530px',
      showHeader: true,
      closable: true,
      data: {
        province,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Province) => {

      if (data != undefined) {
        this.provinceList.forEach(val => {
          if (val.id == data.id) {
            val.provinceCode = data.provinceCode;
            val.provinceName = data.provinceName;
            val.regionCode = data.regionCode;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevProvinceList = this.provinceList.filter(x => x.status);
      }
    })
  }
  removeProvinceRecord(province: Province) {
    if (province != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.addressService.deleteProvince(province.id).subscribe({
            next: (result: boolean) => {
              result;
              this.provinceList.forEach(element => {
                if (province.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              console.log('complete');
              this.prevProvinceList = this.provinceList.filter(x => x.status);
            }
          });
        }
      });
    }
  }
}
