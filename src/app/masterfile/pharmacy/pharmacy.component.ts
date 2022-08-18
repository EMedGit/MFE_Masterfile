import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pharmacy } from 'src/app/models/pharmacy.model';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { PopupPharmacyComponent } from '../popup/popup-pharmacy/popup-pharmacy.component';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  providers : [DialogService]
})
export class PharmacyComponent implements OnInit {
  searchkey: ""
  ref : DynamicDialogRef;
  pharmacy : Pharmacy;
  prevPharmacy : Pharmacy[];
  pharmacyList : Pharmacy[];
  selectedPharmacy : Pharmacy[];

  constructor(private pharmacyService : PharmacyService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.pharmacyService.getPharmacyService().subscribe({
      next: (result: Pharmacy[]) => {
        this.pharmacyList = result;
        this.prevPharmacy = this.pharmacyList.filter(x => x.status);
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
    console.log(this.selectedPharmacy)
    let filter: any[] = [];
    this.pharmacyList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.prevPharmacy = filter;
  }
  addPharmacyPopup() {
    this.ref = this.dialogService.open(PopupPharmacyComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Pharmacy) => {
      if (data != undefined) {
        this.pharmacyList.push(data);
        this.prevPharmacy = this.pharmacyList.filter(x => x.status);
      }
    })
  }
  updatePharmacyPopUp(pharmacy : Pharmacy) {
    this.ref = this.dialogService.open(PopupPharmacyComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        pharmacy,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Pharmacy) => {

      if (data != undefined) {
        this.pharmacyList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;     
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevPharmacy = this.pharmacyList.filter(x => x.status);
      }
    })
  }
  removePharmacyRecord(pharmacy : Pharmacy) {
    this.pharmacyService.deletePharmacyService(pharmacy.id).subscribe({
      next: (result: boolean) => {
        result;
        this.pharmacyList.forEach(element => {
          if (pharmacy.id == element.id) {
            element.status = false;
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevPharmacy = this.pharmacyList.filter(x => x.status);
      }
    });
  }
  batchdeletePharmacy() {
    if (this.selectedPharmacy.length > 0) {
      console.log(this.selectedPharmacy)
      this.selectedPharmacy.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.pharmacyService.batchdeletePharmacyService(this.selectedPharmacy).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.pharmacyList.forEach(val => {
              let x = this.selectedPharmacy.find(x => x.id == val.id);
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
          this.prevPharmacy = this.pharmacyList.filter(x => x.status);
        }
      });
    }
  }
}
