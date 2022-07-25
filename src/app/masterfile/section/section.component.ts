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

  ref: DynamicDialogRef;
  section: Section;
  sections: Section[];
  selectedSections: Section[];

  constructor(private SectionService : SectionService,  private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    try {
      this.SectionService
        .getSections('','',0,100)
        .subscribe((retval : Section[]) => {
          console.log(retval);
<<<<<<< HEAD
          
=======
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
          this.sections = retval;
        });
    }
    catch (error){
<<<<<<< HEAD
      console.log(error)
=======
      console.log
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
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
<<<<<<< HEAD
        section: {},
=======
        immunization: {},
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
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
