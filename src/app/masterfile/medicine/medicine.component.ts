import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Medicine } from 'src/app/models/medicine.model';
import { MedicineService } from 'src/app/services/medicines.service';
import { PopupMedicineComponent } from '../popup/popup-medicine/popup-medicine.component';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
  providers: [DialogService]
})
export class MedicineComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  medicine: Medicine;
  medicineList: Medicine[];
  selectedMedicineList: Medicine[];
  newMedicineList: Medicine[];

  constructor(private medicineService: MedicineService, private dialogService: DialogService) { }

  ngOnInit(): void {
    //this.medicineService.getMedicines().then(data => this.medicineList = data);
    this.getData();
  }
  getData() {
    this.medicineService.getList('','',0,100).subscribe({
      next: (result: Medicine[]) => {
        this.medicineList = result;
        this.newMedicineList = this.medicineList.filter(x => x.status);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
      }
    });
  }
  
  filter() {
    console.log(this.selectedMedicineList)
    let filter: any[] = [];
    this.newMedicineList.forEach(val => {
      console.log(val)
      if (val.code.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);      }

    });
    console.log(filter)
    this.newMedicineList = filter;
  }

  addPopup()
  {
    this.ref = this.dialogService.open(PopupMedicineComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        medicine: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Medicine) => {
      if (data != undefined) {
        this.medicineList.push(data);
        this.newMedicineList = this.medicineList.filter(x => x.status);
      }
    })
  }

  updatePopUp(medicine: Medicine){
    this.ref = this.dialogService.open(PopupMedicineComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        medicine,
        isForUpdating: true
      }      
    })
    this.ref.onClose.subscribe((data: Medicine) => {
      if (data != undefined) {
        this.medicineList.forEach(val => {
          if (val.id == data.id) {
            val = data;
          }
        });
        this.newMedicineList = this.medicineList.filter(x => x.status);
      }
    })
  }

  removeItem(medicine : Medicine) {
    this.medicineService.delete(medicine.id).subscribe({
      next : (result : boolean) => {
        result;
        this.medicineList.forEach(element => {
          if (medicine.id == element.id)
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
        this.newMedicineList = this.medicineList.filter(x => x.status);
      }
    });
  }




}
