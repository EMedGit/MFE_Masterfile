import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-popup-section',
  templateUrl: './popup-section.component.html',
  styleUrls: ['./popup-section.component.css']
})
export class PopupSectionComponent implements OnInit {

  sectionForm: FormGroup;
  formBuilder: FormBuilder;

  section: Section;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private sectionService : SectionService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.section.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.sectionForm.patchValue(this.config.data.section)    
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.sectionForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']   
      });
  }

  ClosePopUp(data: Section){
    console.log(this.ref);
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving){
      this.sectionService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }     
  }

  updateData(){    
    let data = this.config.data.section;
    data.code = this.sectionForm.controls['code'].value;
    data.description = this.sectionForm.controls['description'].value;
    if(this.isForUpdating){
      this.sectionService.update(data.id, data).subscribe({
      next: (result : Section) => {
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

  getData() : Section {
    this.section = new Section
    this.section.code = this.sectionForm.controls['code'].value;
    this.section.description = this.sectionForm.controls['description'].value;
    return this.section;
  }


}
