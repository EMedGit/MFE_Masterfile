import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region.model';

@Component({
  selector: 'app-popup-province',
  templateUrl: './popup-province.component.html',
  styleUrls: ['./popup-province.component.css']
})
export class PopupProvinceComponent implements OnInit {

  isForUpdating= false;

  regions: Region[];

  constructor() { 

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
    
  }

}
