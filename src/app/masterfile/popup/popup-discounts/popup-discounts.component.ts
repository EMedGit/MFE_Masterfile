import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Discounts } from 'src/app/models/discounts.model';
import { PatientType } from 'src/app/models/patienttype.model';
import { DiscountsService } from 'src/app/services/discounts.service';
import { PatienttypeService } from 'src/app/services/patienttype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-discounts',
  templateUrl: './popup-discounts.component.html',
  styleUrls: ['./popup-discounts.component.css']
})
export class PopupDiscountsComponent implements OnInit {

  patienttype : PatientType;
  discountsForm : FormGroup;
  formBuilder : FormBuilder;
  discounts : Discounts;
  arrDiscounts : Discounts[] = [];
  discountsList : Discounts[];
  id : number = 0;
  patienttypeList : PatientType[];

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  
  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private discountsService : DiscountsService, 
    private patientTypeService : PatienttypeService,
    private datePipe : DatePipe,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.discountsForm.patchValue(this.config.data.discounts);
    console.log(this.config.data.discounts,'hellox')
    this.loadData();
  }

  selectedItem(event : any){
    this.patienttype = event.value;
  }
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.discountsForm = this.formBuilder.group(
      {
        patientTypeDescription : [''],
        discountSchemaPharmacy : 0,
        discountSchemaLaboratory : 0,
        discountSchemaRadiology : 0
      });
  }
  loadData() : void {
    this.patientTypeService.getPatientType().subscribe(retval => {
      this.patienttypeList = retval;
    });
  }
  ClosePopUp(data:Discounts){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.discountsService.postDiscounts(this.getValue()).subscribe(result=>{
        this.ClosePopUp(result);  
      });      
    }
  }
  updateData(){
    let data = this.config.data.discounts;
    let obj = new Discounts();
    if(this.patienttype == undefined){
      obj.patientTypeId = data.id;
    } else {
      obj.patientTypeId = this.patienttype.id;
    }
    obj.patientTypeDescription = this.discountsForm.controls['patientTypeDescription'].value;
    obj.discountSchemaLaboratory = this.discountsForm.controls['discountSchemaLaboratory'].value;
    obj.discountSchemaPharmacy = this.discountsForm.controls['discountSchemaPharmacy'].value;
    obj.discountSchemaRadiology = this.discountsForm.controls['discountSchemaRadiology'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      console.log(obj,'hello')
      this.discountsService.putDiscounts(data.id, obj).subscribe({
      next: (result : Discounts) => {
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

  getValue(): Discounts {
    this.discounts = new Discounts();  
    if(this.patienttype == undefined)
    {
      let x = this.patienttypeList.find(x => x.id);
      this.discounts.patientTypeId = x?.id;
      this.discounts.patientTypeDescription = x?.description;
    } else {     
      this.discounts.patientTypeId = this.patienttype.id;
      this.discounts.patientTypeDescription = this.patienttype.description;
    }
    this.discounts.patientTypeDescription = this.discountsForm.controls['patientTypeDescription'].value;
    this.discounts.discountSchemaPharmacy = this.discountsForm.controls['discountSchemaPharmacy'].value;
    this.discounts.discountSchemaLaboratory = this.discountsForm.controls['discountSchemaLaboratory'].value;
    this.discounts.discountSchemaRadiology = this.discountsForm.controls['discountSchemaRadiology'].value;
    this.discounts.createdBy = '';
    return this.discounts;
  }
}
