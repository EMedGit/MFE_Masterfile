import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { BulkUserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { PopupHealthfacilityComponent } from '../popup/popup-healthfacility/popup-healthfacility.component';

@Component({
  selector: 'app-healthfacility',
  templateUrl: './healthfacility.component.html',
  styleUrls: ['./healthfacility.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class HealthfacilityComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  healthFacility: HealthFacility;
  healthFacilities: HealthFacility[];
  selectedHealthFacilities: HealthFacility[];
  newHealthFacilityList: HealthFacility[];
  bulkUserHealthFacility: BulkUserHealthFacility;
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private HealthFacilityService: HealthFacilityService,
    private confirmationService: ConfirmationService,
    private usersService: UsersService,
    private toastService: ToastService,
    private dialogService: DialogService) { }

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
      height: '400px',
      showHeader: true,
      closable: false,
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
      height: '400px',
      showHeader: true,
      closable: false,
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
      }
    })
  }

  removeHealthFacility(healthFacility: HealthFacility) {
    if (healthFacility != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
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
              this.newHealthFacilityList = this.healthFacilities.filter(x => x.status);
              this.usersService.bulkDeleteUserHealthFacility(this.getUserHealthFacility(healthFacility)).subscribe({
                next: (retVal) => {
                }, error: (err) => {
                  this.toastService.showError(err.error.messages);
                }, complete: () => {
                  this.toastService.showSuccess('Successfully Deleted.');
                }
              });
            }
          });
        }
      });
    }
  }
  getUserHealthFacility(healthFacility: HealthFacility): BulkUserHealthFacility {
    this.bulkUserHealthFacility = new BulkUserHealthFacility();
    this.bulkUserHealthFacility.healthFacilityId = healthFacility.id;
    this.bulkUserHealthFacility.type = 'HealthFacility';
    return this.bulkUserHealthFacility;
  }
}
