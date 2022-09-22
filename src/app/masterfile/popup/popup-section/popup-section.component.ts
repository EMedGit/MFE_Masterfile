import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { Section } from 'src/app/models/section.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { SectionService } from 'src/app/services/section.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-section',
  templateUrl: './popup-section.component.html',
  styleUrls: ['./popup-section.component.css']
})
export class PopupSectionComponent implements OnInit {

  sectionForm: FormGroup;
  formBuilder: FormBuilder;

  section: Section;
  departmentList: Department[];

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private sectionService: SectionService,
    private departmentService: DepartmentService, private hfService: HealthFacilityService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.section.status;
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.sectionForm.patchValue(this.config.data.section)
    this.loadData();
  }
  loadData(): void {
    this.departmentService.getDepartments('', '', 0, 0, 100).subscribe(retVal => { this.departmentList = retVal });
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.sectionForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        departmentID: ['']
      });
  }

  ClosePopUp(data: Section) {
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.sectionService.GetSectionByCode(this.sectionForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.sectionForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.sectionService.insert(this.getData()).subscribe(retval => this.ClosePopUp(retval));
        }
      });
    }
  }

  updateData() {
    let data = this.config.data.section;
    data.code = this.sectionForm.controls['code'].value;
    data.description = this.sectionForm.controls['description'].value;
    data.departmentID = this.sectionForm.controls['departmentID'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.sectionService.update(data.id, data).subscribe({
        next: (result: Section) => {
          data = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }

  }

  getData(): Section {
    this.section = new Section();
    this.section.code = this.sectionForm.controls['code'].value;
    this.section.description = this.sectionForm.controls['description'].value;
    this.section.departmentID = this.sectionForm.controls['departmentID'].value;
    this.section.createdBy = '';
    this.section.createdDateTime = new Date();

    return this.section;

  }


}
