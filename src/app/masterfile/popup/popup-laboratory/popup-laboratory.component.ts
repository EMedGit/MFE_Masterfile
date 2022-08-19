import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Laboratory } from 'src/app/models/laboratory.model';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-popup-laboratory',
  templateUrl: './popup-laboratory.component.html',
  styleUrls: ['./popup-laboratory.component.css']
})
export class PopupLaboratoryComponent implements OnInit {

  laboratory : Laboratory;
  laboratoryForm : FormGroup;
  formBuilder : FormBuilder;
  arrLaboratory : Laboratory[] = [];
  laboratoryList : Laboratory[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  constructor(private ref : DynamicDialogRef,
    private config : DynamicDialogConfig,
    private laboratoryService : LaboratoryService,
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.laboratoryForm.patchValue(this.config.data.laboratory);
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.laboratoryForm = this.formBuilder.group(
      {
        code: [''],
        description: [''],
        price: [''],
        highestPrice: [''],
        lowestPrice: [''],
        priceReferenceIndex: [''],
        diagnosisRemarks: [''],
        departmentCode: [''],
        specializationCode: ['']
      });
  }
  ClosePopUp(data:Laboratory){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.laboratoryService.postLaboratory(this.getValue()).subscribe(result=>{

        this.ClosePopUp(result);  
      });      
    }
  }
  updateData(){
    let data = this.config.data.laboratory;
    let obj = new Laboratory();
    obj.code = this.laboratoryForm.controls['code'].value;
    obj.description = this.laboratoryForm.controls['description'].value;
    obj.price = this.laboratoryForm.controls['price'].value;
    obj.highestPrice = this.laboratoryForm.controls['highestPrice'].value;
    obj.lowestPrice = this.laboratoryForm.controls['lowestPrice'].value;
    obj.priceReferenceIndex = this.laboratoryForm.controls['priceReferenceIndex'].value;
    obj.diagnosisRemarks = this.laboratoryForm.controls['diagnosisRemarks'].value;
    obj.departmentCode = this.laboratoryForm.controls['departmentCode'].value;
    obj.specializationCode = this.laboratoryForm.controls['specializationCode'].value;
    obj.modifiedBy = 'Fox';
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.laboratoryService.putLaboratory(data.id, obj).subscribe({
      next: (result : Laboratory) => {
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

  getValue(): Laboratory {
    this.laboratory = new Laboratory();  
    this.laboratory.createdBy = 'admin';
    this.laboratory.code = this.laboratoryForm.controls['code'].value;
    this.laboratory.description = this.laboratoryForm.controls['description'].value;
    this.laboratory.price = this.laboratoryForm.controls['price'].value;
    this.laboratory.highestPrice = this.laboratoryForm.controls['highestPrice'].value;
    this.laboratory.lowestPrice = this.laboratoryForm.controls['lowestPrice'].value;
    this.laboratory.priceReferenceIndex = this.laboratoryForm.controls['priceReferenceIndex'].value;
    this.laboratory.diagnosisRemarks = this.laboratoryForm.controls['diagnosisRemarks'].value;
    this.laboratory.departmentCode = this.laboratoryForm.controls['departmentCode'].value;
    this.laboratory.specializationCode = this.laboratoryForm.controls['specializationCode'].value;
    return this.laboratory;
  }
}
