import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand.model';
import { CivilStatus } from 'src/app/models/civilstatus.model';
import { BrandService } from 'src/app/services/brand.service';
import { PopupBrandComponent } from '../popup/popup-brand/popup-brand.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  providers: [DialogService]
})
export class BrandComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  brand : Brand;
  prevBrandList : Brand[];
  brandList : Brand[];
  selectedBrand : Brand[];

  constructor(private brandService : BrandService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.brandService.getBrandList().subscribe({
      next: (result : Brand[]) => {
        this.brandList = result;
        this.prevBrandList = this.brandList.filter(x => x.status);
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
    this.brandList.forEach(val => {
      if(val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status){
        filter.push(val);
      }
    });
  }
  addBrandPopup(){
    this.ref = this.dialogService.open(PopupBrandComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data : CivilStatus) => {
        if(data != undefined){
          this.brandList.push(data);
          this.prevBrandList = this.brandList.filter(x => x.status);
        }
    });
  }

  updateBrandPopUp(brand : Brand){
    this.ref = this.dialogService.open(PopupBrandComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        brand,
        isForUpdating: true
      }
    });
    this.ref.onClose.subscribe((data : Brand) => {
      if(data != undefined){
        this.brandList.forEach(val => {
          if(val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
          }
        });
        this.prevBrandList = this.brandList.filter(x => x.status);
      }
    });
  }
  removeBrandRecord(brand : Brand){
    this.brandService.deleteBrand(brand.id).subscribe({
      next : (result : boolean) => {
        result;
        this.brandList.forEach(element => {
          if(brand.id == element.id){
            element.status = false;
          }
        });
      },
      error : (err : any) => {
        console.log(err);
      },
      complete : () => {
        console.log('complete');
        this.prevBrandList = this.brandList.filter(x => x.status);
      }
    });
  }
  batchdeleteBrand(){
    if(this.selectedBrand.length > 0) {
      this.selectedBrand.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.brandService.batchdeleteBrand(this.selectedBrand).subscribe({
        next : (result : boolean) => {
          if(result) {
            this.brandList.forEach(val => {
              let x = this.selectedBrand.find(x => x.id == val.id);
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
          this.prevBrandList = this.brandList.filter(x => x.status);
        }
      });
    }
  }
}
