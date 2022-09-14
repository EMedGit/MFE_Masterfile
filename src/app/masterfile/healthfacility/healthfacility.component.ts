import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { PopupHealthfacilityComponent } from '../popup/popup-healthfacility/popup-healthfacility.component';

@Component({
  selector: 'app-healthfacility',
  templateUrl: './healthfacility.component.html',
  styleUrls: ['./healthfacility.component.css'],
  providers: [DialogService]
})
export class HealthfacilityComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  healthFacility: HealthFacility;
  healthFacilities: HealthFacility[];
  selectedHealthFacilities: HealthFacility[];
  newHealthFacilityList: HealthFacility[];

  constructor(private HealthFacilityService: HealthFacilityService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.HealthFacilityService.getHealthFacility().subscribe({
      next: (result: HealthFacility[]) => {
        this.healthFacilities = result;
        this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    })
  }


  filter() {
    let filter: any[] = [];
    this.healthFacilities.forEach(val => {
      if (val.name.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newHealthFacilityList = filter;
  }

  addHealthFacilityPopup() {
    this.ref = this.dialogService.open(PopupHealthfacilityComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      closable: true,
      data: {
        // healthFacility: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: HealthFacility) => {
      if (data != undefined) {
        this.healthFacilities.push(data);
        this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
      }
    })
  }

  updateHealthFacilityPopup(healthFacility: HealthFacility) {
    this.ref = this.dialogService.open(PopupHealthfacilityComponent, {
      width: '1000px',
      height: '500px',
      showHeader: true,
      data: {
        healthFacility,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: HealthFacility) => {
      if (data != undefined) {
        this.healthFacilities.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.name = data.name;
            val.facilityAddress = data.facilityAddress;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
        console.log(this.newHealthFacilityList,'heysss')
      }
    })
  }

  removeHealthFacility(healthFacility: HealthFacility) {
    console.log(healthFacility);
    this.HealthFacilityService.delete(healthFacility.id).subscribe({
      next: (result: boolean) => {
        result;
        this.healthFacilities.forEach(element => {
          if (healthFacility.id == element.id) {
            element.status = false;
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
      }
    });
  }


}
