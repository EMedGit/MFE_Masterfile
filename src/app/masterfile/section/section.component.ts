import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section.service';
import { PopupSectionComponent } from '../popup/popup-section/popup-section.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  ref: DynamicDialogRef;
  section: Section;
  sections: Section[];
  selectedSections: Section[];

  constructor(private SectionService : SectionService,  private dialogService: DialogService) { }

  ngOnInit(): void {
  }
  getData() {
    try {
      this.SectionService
        .getSections('','',0,100)
        .subscribe((retval : Section[]) => {
          console.log(retval);
          this.sections = retval;
        });
    }
    catch (error){
      console.log
    }
  }


  filter(value: any) {
    this.sections.every(a => a.description?.includes(value.key));
  }

  addSectionPopup()
  {
    this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'SECTION DETAILS',
      closable: true,
      data: {
        immunization: {},
        isForSaving: true
      }
    })
  }

  updateSectionPopup(section : Section) {
    this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '450px',
      showHeader: true,
      header: 'SECTION DETAILS',
      data: {
        section,
        isForUpdating: true
      }
    })
  }


}
