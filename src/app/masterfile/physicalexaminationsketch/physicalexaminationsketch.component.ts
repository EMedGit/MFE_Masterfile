import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PhysicalExaminationSketch } from 'src/app/models/physicalexaminationsketch.model';
import { PhysicalExaminationSketchService } from 'src/app/services/physicalexaminationsketch.service';
import { PopupPhysicalexaminationsketchComponent } from '../popup/popup-physicalexaminationsketch/popup-physicalexaminationsketch.component';

@Component({
  selector: 'app-physicalexaminationsketch',
  templateUrl: './physicalexaminationsketch.component.html',
  styleUrls: ['./physicalexaminationsketch.component.css'],
  providers: [DialogService]
})
export class PhysicalexaminationsketchComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  physicalExaminationSketch: PhysicalExaminationSketch;
  pesList: PhysicalExaminationSketch[];
  selectedPESList: PhysicalExaminationSketch[];
  newPESList: PhysicalExaminationSketch[];

  constructor(private pesService: PhysicalExaminationSketchService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getdate();
  }

  getdate()
  {
    this.pesService.getList('',0,999999).subscribe({
      next: (result: PhysicalExaminationSketch[]) => {
        this.pesList = result;
        this.newPESList = this.pesList.filter(x => x.status);
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
    console.log(this.selectedPESList);
    let filter: any[] = [];
    this.newPESList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);      
      }

    });
    console.log(filter)
    this.newPESList = filter;
  }

  addPopup() {
    this.ref = this.dialogService.open(PopupPhysicalexaminationsketchComponent, {
      width: '1000px',
      height: '825px',
      showHeader: true,
      closable: true,
      data: {
        physicalExaminationSketch: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationSketch) => {
      if (data != undefined) {
        this.pesList.push(data);
        this.newPESList = this.pesList.filter(x => x.status);
      }
    })
  }

  updatePopUp(physicalExaminationSketch: PhysicalExaminationSketch) {
    this.ref = this.dialogService.open(PopupPhysicalexaminationsketchComponent, {
      width: '1000px',
      height: '825px',
      showHeader: true,
      closable: true,
      data: {
        physicalExaminationSketch,
        isForUpdating: true
      }      
    })
    this.ref.onClose.subscribe((data: PhysicalExaminationSketch) => {
      if (data != undefined) {
        this.pesList.forEach(val => {
          if (val.id == data.id) {
            val = data;
          }
        });
        this.newPESList = this.pesList.filter(x => x.status);
      }
    })
  }

  removeItem(physicalExaminationSketch: PhysicalExaminationSketch) {
    this.pesService.delete(physicalExaminationSketch.id).subscribe({
      next : (result : boolean) => {
        result;
        this.pesList.forEach(element => {
          if (physicalExaminationSketch.id == element.id)
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
        this.newPESList = this.pesList.filter(x => x.status);
      }
    });
  }


  
}
