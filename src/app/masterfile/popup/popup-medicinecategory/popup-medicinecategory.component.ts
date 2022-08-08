import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Medicinecategory } from 'src/app/models/medicinecategory.model';
import { MedicinecategoryService } from 'src/app/services/medicinecategory.service';

@Component({
  selector: 'app-popup-medicinecategory',
  templateUrl: './popup-medicinecategory.component.html',
  styleUrls: ['./popup-medicinecategory.component.css']
})
export class PopupMedicinecategoryComponent implements OnInit {

  medicinecategoryForm : FormGroup;
  formBuilder : FormBuilder;
  medicinecategory : Medicinecategory;
  arrMedicineCategory : Medicinecategory[] = [];
  medicinecategoryList : Medicinecategory[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private medicinecategoryService : MedicinecategoryService, 
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    
    this.buildFormGroup();
    this.medicinecategoryForm.patchValue(this.config.data.medicineCategory);
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.medicinecategoryForm = this.formBuilder.group(
      {
        code : [''],
        description : ['']
      });
  }
  ClosePopUp(data:Medicinecategory){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.medicinecategoryService.postMedicineCategory(this.getValue()).subscribe(result=>{
          this.ClosePopUp(result);  
        });      
    }
  }
  updateData(){    
    let data = this.config.data.medicineCategory;
    let obj = new Medicinecategory();
    obj.code = this.medicinecategoryForm.controls['code'].value;
    obj.description = this.medicinecategoryForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.medicinecategoryService.putMedicineCategory(data.id, obj).subscribe({
      next: (result : Medicinecategory) => {
          obj = result;
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
  getValue(): Medicinecategory {
    this.medicinecategory = new Medicinecategory();
    this.medicinecategory.code = this.medicinecategoryForm.controls['code'].value;
    this.medicinecategory.description = this.medicinecategoryForm.controls['description'].value;
    return this.medicinecategory;
  }
}