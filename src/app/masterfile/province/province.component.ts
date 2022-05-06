import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Province } from 'src/app/models/province.model';
import { Region } from 'src/app/models/region.model';
import { ProvinceService } from 'src/app/services/province.service';
import { PopupProvinceComponent } from '../popup/popup-province/popup-province.component';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css'],
  providers: [DialogService]
})
export class ProvinceComponent implements OnInit {

  ref: DynamicDialogRef;
  provinces: Province[];
  province: Province;
  regions: Region[];
  
  clonedProvinces: { [s: string]: Province; } = {};

  constructor(private icd10Service: ProvinceService,
              private dialogService: DialogService) { 

                this.regions = [
                  {regionName: 'Region I', regionCode: '010000000'},
                  {regionName: 'Region II', regionCode: '020000000'},
                  {regionName: 'Region III', regionCode: '030000000'},
                  {regionName: 'Region IV-A', regionCode: '040000000'},
                  {regionName: 'Mimaropa Region', regionCode: '170000000'},
                  {regionName: 'Region V', regionCode: '050000000'},
                  {regionName: 'Region VI', regionCode: '060000000'},
                  {regionName: 'Region VII', regionCode: '070000000'},
                  {regionName: 'Region VIII', regionCode: '080000000'},
                  {regionName: 'Region IX', regionCode: '090000000'},
                  {regionName: 'Region X', regionCode: '100000000'},
                  {regionName: 'Region XI', regionCode: '110000000'},
                  {regionName: 'Region XII', regionCode: '120000000'},
                  {regionName: 'National Capital Region', regionCode: '130000000'},
                  {regionName: 'Cordillera Administrative Region', regionCode: '140000000'},
                  {regionName: 'Autonomous Region in Muslim Mindanao', regionCode: '150000000'},
                  {regionName: 'Region XIII', regionCode: '160000000'}
                ];
  }

  ngOnInit(): void {
    this.icd10Service.getProvinces().then(data => this.provinces = data);
  }

  kep(event: any){
    console.log("Hello", this.provinces);
    console.log("Hi", event.target.value);
    if(this.provinces.some(a => a.provinceName?.toLowerCase() === event.target.value.toLowerCase())){
      let a = this.provinces.filter(a => a.provinceName?.toLowerCase() === event.target.value.toLowerCase());
      this.provinces = a;
    }
    else{
      this.icd10Service.getProvinces().then(data => this.provinces = data);
    }
   
  }

  addProvincePopup() {
    this.ref = this.dialogService.open(PopupProvinceComponent, {
      width: '50%',
      height: '40%',
      showHeader: false,
      closable: true,
      data: {
        icd: {},
        isForSaving: true
      }
    })
  }

  onRowEditInit(province: Province) {
    console.log(province);
    this.clonedProvinces[province.id] = {...province};
  }

}
