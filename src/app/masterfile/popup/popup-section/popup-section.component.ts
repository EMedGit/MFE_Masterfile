import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Section } from 'src/app/models/section.model';
import { SectionService } from 'src/app/services/section.service';
=======
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42

@Component({
  selector: 'app-popup-section',
  templateUrl: './popup-section.component.html',
  styleUrls: ['./popup-section.component.css']
})
export class PopupSectionComponent implements OnInit {

<<<<<<< HEAD
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

  ClosePopUp(){
    this.ref.close();
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData(){
    if(this.isForSaving){
        this.sectionService.insert(this.getData()).subscribe((retval) => { this.section = retval });
    }
    else{

    } 
    this.ClosePopUp();  
  }


  getData() : Section {
    let obj : Section = {
      code : this.sectionForm.controls['code'].value,
      description : this.sectionForm.controls['description'].value
    }

    return obj;
  }


=======
  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
}
