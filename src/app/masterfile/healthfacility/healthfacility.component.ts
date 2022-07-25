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

  ref: DynamicDialogRef;
  healthFacility: HealthFacility;
  healthFacilities: HealthFacility[];
  selectedHealthFacilities: HealthFacility[];
  newHealthFacilityList: HealthFacility[];
  
  constructor(private HealthFacilityService : HealthFacilityService,  private dialogService: DialogService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.HealthFacilityService
        .getHealthFacility('','',0,100)
        .subscribe((retval : HealthFacility[]) => {
          console.log(retval);
          this.healthFacilities = retval;
        });
    }
    catch (error){
      console.log
    }
  }


  filter(value: any) {
    this.healthFacilities.every(a => a.name?.includes(value.key));
  }

  addHealthFacilityPopup()
  {
    this.dialogService.open(PopupHealthfacilityComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'HEALTH FACILITY DETAILS',
      closable: true,
      data: {
        healthFacility: {},
        isForSaving: true
      }
    })
  }

  updateHealthFacilityPopup(healthFacility : HealthFacility) {
    this.dialogService.open(PopupHealthfacilityComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'HEALTH FACILITY DETAILS',
      data: {
        healthFacility,
        isForUpdating: true
      }
    })
  }

  removeHealthFacility(healthFacility : HealthFacility) {
      this.HealthFacilityService.delete(healthFacility.id).subscribe({
        next : (result : boolean) => {
          result;
          this.healthFacilities.forEach(element => {
            if (healthFacility.id == element.id)
            {
              element.status = false;
            }
          });
        },
        error : (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
          this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
        }
      });
  }


}
