import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AncillarySection } from 'src/app/models/ancillarysection.model';
import { AncillarysectionService } from 'src/app/services/ancillarysection.service';
import { PopupAncillarysectionComponent } from '../popup/popup-ancillarysection/popup-ancillarysection.component';

@Component({
  selector: 'app-ancillarysection',
  templateUrl: './ancillarysection.component.html',
  styleUrls: ['./ancillarysection.component.css'],
  providers: [DialogService]
})
export class AncillarysectionComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  ancillarysection : AncillarySection;
  prevAncillarySectionList : AncillarySection[];
  ancillarysectionList : AncillarySection[];
  selectedAncillarySection : AncillarySection[];

  constructor(private ancillarysectionservice : AncillarysectionService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.ancillarysectionservice.getAncillarySection().subscribe({
      next: (result: AncillarySection[]) => {
        this.ancillarysectionList = result;
        this.prevAncillarySectionList = this.ancillarysectionList.filter(x => x.status);
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
    console.log(this.selectedAncillarySection)
    let filter: any[] = [];
    this.ancillarysectionList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    this.prevAncillarySectionList = filter;
  }
  addAncillarySectionPopup() {
    this.ref = this.dialogService.open(PopupAncillarysectionComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: AncillarySection) => {
      if (data != undefined) {
        this.ancillarysectionList.push(data);
        this.prevAncillarySectionList = this.ancillarysectionList.filter(x => x.status);
      }
    })
  }
  updateAncillarySectionPopUp(ancillarysection: AncillarySection) {
    this.ref = this.dialogService.open(PopupAncillarysectionComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        ancillarysection,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: AncillarySection) => {

      if (data != undefined) {
        this.ancillarysectionList.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.prevAncillarySectionList = this.ancillarysectionList.filter(x => x.status);
      }
    })
  }
  removeAncillarySectionRecord(ancillarysection: AncillarySection) {
    this.ancillarysectionservice.deleteAncillarySection(ancillarysection.id).subscribe({
      next: (result: boolean) => {
        result;
        this.ancillarysectionList.forEach(element => {
          if (ancillarysection.id == element.id) {
            element.status = false;
          }

        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.prevAncillarySectionList = this.ancillarysectionList.filter(x => x.status);
      }
    });
  }
  batchdeleteAncillarySection() {
    if (this.selectedAncillarySection.length > 0) {
      console.log(this.selectedAncillarySection)
      this.selectedAncillarySection.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.ancillarysectionservice.batchdeleteAncillarySection(this.selectedAncillarySection).subscribe({
        next: (result: boolean) => {
          if (result) {
            this.ancillarysectionList.forEach(val => {
              let x = this.selectedAncillarySection.find(x => x.id == val.id);
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
          this.prevAncillarySectionList = this.ancillarysectionList.filter(x => x.status);
        }
      });
    }
  }
}
