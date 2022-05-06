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

  ref: DynamicDialogRef;
  medicines: Medicine[];
  medicine: Medicine;

  constructor(private medicineService: MedicineService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.medicineService.getMedicines().then(data => this.medicines = data);
  }
  
  updateMedicinePopUp(medicine: Medicine){
    this.ref = this.dialogService.open(PopupMedicineComponent, {
      width: '1000px',
      height: '520px',
      showHeader: false,
      data: {
        medicine,
        isForUpdating: true
      }
      
    })
  }
}
