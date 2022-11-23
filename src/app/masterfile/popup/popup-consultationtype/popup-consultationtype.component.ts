import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Consultationtype } from 'src/app/models/consultationtype.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { ConsultationtypeService } from 'src/app/services/consultationtype.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-consultationtype',
  templateUrl: './popup-consultationtype.component.html',
  styleUrls: ['./popup-consultationtype.component.css']
})
export class PopupConsultationtypeComponent implements OnInit {

  healthfacility : HealthFacility;
  healthFacilityList : HealthFacility[];
  consultationtypeForm : FormGroup;
  formBuilder : FormBuilder;
  consultationType : Consultationtype;
  arrConsultationType : Consultationtype[] = [];
  consultationTypeList : Consultationtype[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, 
    private config : DynamicDialogConfig, 
    private consultationtypeService : ConsultationtypeService, 
    private datePipe : DatePipe,
    private healthfacilityServices : HealthFacilityService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.consultationtypeForm.patchValue(this.config.data.consultationType);
    this.loadData();
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.consultationtypeForm = this.formBuilder.group(
    {
      code : [''],
      description : ['']
    });
  }
  loadData() : void {
    this.healthfacilityServices.getHealthFacility().subscribe(retval => { 
    return this.healthFacilityList = retval;
    });
  }
  selectedItem(event : any){
    this.healthfacility = event.value;
  }
  ClosePopUp(data : Consultationtype){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.consultationtypeService.GetConsultationTypeByCode(this.consultationtypeForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.consultationtypeForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
        this.consultationtypeService.postConsultationType(this.getValue()).subscribe({
          next: result => {
            this.ClosePopUp(result);
          }, error: (err) => {
            this.toastService.showError(err.error.messages);
          }, complete: () => {
            this.toastService.showSuccess('Successfully Saved.');
          }
        });
      }
      });
    }
  } 
  updateData(){
    let data = this.config.data.consultationType;
    let obj = new Consultationtype();
    if(this.healthfacility == undefined)
    {
      let x = this.healthFacilityList.find(x => x.id);
      obj.healthFacilityId = x?.id
      obj.healthFacilityCode = x?.code;
    } else {
      obj.healthFacilityId = this.healthfacility.id;
      obj.healthFacilityCode = this.healthfacility.code;
    }
    obj.code = this.consultationtypeForm.controls['code'].value.toUpperCase();
    obj.description = this.consultationtypeForm.controls['description'].value.toUpperCase();
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      console.log('try', obj);
      this.consultationtypeService.putConsultationType(data.id, obj).subscribe({
        next : (result : Consultationtype) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error : (err) => {
          this.toastService.showError(err.error.messages);
        },
        complete : () => {
          this.toastService.showSuccess('Successfully Updated.');
        }
      });
    }
  }

  getValue(): Consultationtype {
    this.consultationType = new Consultationtype();
    if(this.healthfacility == undefined)
    {
      let x = this.healthFacilityList.find(x => x.id);
      this.consultationType.healthFacilityId = x?.id;
      this.consultationType.healthFacilityCode = x?.code;
    } else {
      this.consultationType.healthFacilityId = this.healthfacility.id;
      this.consultationType.healthFacilityCode = this.healthfacility.code;
    }
    this.consultationType.code = this.consultationtypeForm.controls['code'].value.toUpperCase();
    this.consultationType.description = this.consultationtypeForm.controls['description'].value.toUpperCase();
    return this.consultationType;
  }
}
