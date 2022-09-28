import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Section } from 'src/app/models/section.model';
import { BulkUserHealthFacility } from 'src/app/models/userhealthfacility.model';
import { SectionService } from 'src/app/services/section.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { PopupSectionComponent } from '../popup/popup-section/popup-section.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class SectionComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  section: Section;
  sections: Section[];
  selectedSections: Section[];
  newSectionsList: Section[];
  bulkUserHealthFacility: BulkUserHealthFacility;
  responsemessage: string;
  headermessage: string;
  displayResponsive: boolean = false;

  constructor(private SectionService: SectionService, private usersService: UsersService, private toastService: ToastService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.SectionService.getSectionList().subscribe({
      next: (retVal: Section[]) => {
        this.sections = retVal;
        this.newSectionsList = this.sections.filter(x => x.status);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
      }
    });
  }
  filter() {
    let filter: any[] = [];
    this.sections.forEach(val => {
      console.log(val)
      if (val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);
      }
    });
    this.newSectionsList = filter;
  }

  addSectionPopup() {
    this.ref = this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '350px',
      showHeader: true,
      closable: false,
      data: {
        section: {},
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data: Section) => {
      if (data != undefined) {
        this.sections.push(data);
        this.newSectionsList = this.sections.filter(x => x.status);
      }
    });
  }

  updateSectionPopup(section: Section) {
    this.ref = this.dialogService.open(PopupSectionComponent, {
      width: '1000px',
      height: '350px',
      showHeader: true,
      closable: false,
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
            val.departmentID = data.departmentID;
            val.status = data.status;
            val.createdBy = data.createdBy;
            val.createdDateTime = data.createdDateTime;
          }
        });
        this.newSectionsList = this.sections.filter(x => x.status);
      }
    })
  }
  removeSection(section: Section) {
    if (section != undefined) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete the record?`,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.SectionService.delete(section.id).subscribe({
            next: (result: boolean) => {
              result;
              this.sections.forEach(element => {
                if (section.id == element.id) {
                  element.status = false;
                }
              });
            },
            error: (err: any) => {
              console.log(err);
            },
            complete: () => {
              this.newSectionsList = this.sections.filter(x => x.status);
              this.usersService.bulkDeleteUserHealthFacility(this.getUserHealthFacility(section)).subscribe({
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
  getUserHealthFacility(section: Section): BulkUserHealthFacility {
    this.bulkUserHealthFacility = new BulkUserHealthFacility();
    this.bulkUserHealthFacility.sectionId = section.id;
    this.bulkUserHealthFacility.type = 'Section';
    return this.bulkUserHealthFacility;
  }
}
