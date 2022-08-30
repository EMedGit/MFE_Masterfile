import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Region } from 'src/app/models/region.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers : [DialogService]
})
export class RegionComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  region : Region;
  prevRegionList : Region[];
  regionList : Region[];
  selectedRegion : Region[];

  constructor(private addressService : AddressService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.addressService.getRegion().subscribe({
      next: (result: Region[]) => {
        this.regionList = result;
        this.prevRegionList = this.regionList.filter(x => x.status);
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
    console.log(this.selectedRegion)
    let filter: any[] = [];
    this.regionList.forEach(val => {
      console.log(val)
      if (val.regionName.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    console.log(filter)
    this.prevRegionList = filter;
  }
  addRegionPopup(){

  }
  batchdeleteRegion(){

  }
  updateRegionPopUp(region : Region){

  }
  removeRegionRecord(region : Region){

  }
}
