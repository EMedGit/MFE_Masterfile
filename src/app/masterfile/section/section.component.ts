import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section.service';
import { PopupSectionComponent } from '../popup/popup-section/popup-section.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [DialogService]
})
export class SectionComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  section: Section;
  sections: Section[];
  selectedSections: Section[];
  newSectionsList: Section[];

  constructor(private SectionService : SectionService,  private dialogService: DialogService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    try {
      this.SectionService
        .getSections('','',0,0,100)
        .subscribe((retval : Section[]) => {
          console.log(retval);          
          this.sections = retval;
          this.newSectionsList = this.sections.filter(x => x.status);
        });
    }
    catch (error){
      console.log(error);
    }
  }


  filter() {
    //this.sections.every(a => a.description?.includes(value.key));

    console.log(this.selectedSections)
    let filter: any[] = [];
    this.newSectionsList.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }

    });
    console.log(filter)
    this.newSectionsList = filter;
  }

  addSectionPopup()
  {
    this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        section: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: Section) => {
      if (data != undefined) {
        this.sections.push(data);
        this.newSectionsList = this.sections.filter(x => x.status);
      }
    })
  }

  updateSectionPopup(section : Section) {
    this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        section,
        isForUpdating: true
      }
    })
    this.ref.onClose.subscribe((data: Section) => {

      if (data != undefined) {
        this.sections.forEach(val => {
          if (val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newSectionsList = this.sections.filter(x => x.status);
      }
    })
  }

  removeHealthFacility(section : Section) {
    this.SectionService.delete(section.id).subscribe({
      next : (result : boolean) => {
        result;
        this.sections.forEach(element => {
          if (section.id == element.id)
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
        this.newSectionsList = this.sections.filter(x => x.status);
      }
    });
  }

}
