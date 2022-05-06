import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SpecialProcedure } from 'src/app/models/specialProcedure.model';


@Component({
  selector: 'app-popup-rvs',
  templateUrl: './popup-rvs.component.html',
  styleUrls: ['./popup-rvs.component.css']
})
export class PopupRvsComponent implements OnInit {
  
  rvsForm: FormGroup;
  formBuilder: FormBuilder;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  
  specialProcedures: SpecialProcedure[];
  selectedSpecialProcedure: SpecialProcedure;

  constructor(private dialogService: DialogService, private config: DynamicDialogConfig) {

    this.specialProcedures = [
      {name: 'LINAC', code: 'NY'},
      {name: 'HEMODIALYSIS', code: 'RM'},
      {name: 'PERITONEAL', code: 'LDN'},
      {name: 'BRACHYTHERAPHY', code: 'IST'},
      {name: 'CHEMOTHERAPY', code: 'PRS'}
    ];
  }

  ngOnInit(): void {
    
    this.isActiveStatus = this.config.data.rvs.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.rvsForm.patchValue(this.config.data.rvs)
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.rvsForm = this.formBuilder.group(
      {
        code: [''],
        category: [''],
        description:[''],
        caseRateAmount: null,
        hospitalFee: null,
        professionalFee: null,
        secondCaseRateAmount: null,
        secondHospitalFee: null,
        secondProfessionalFee: null,
        allowSingleConfinement: false,
        noOfDays: null,
        procedureType: null,
      });
  }

  get rvsControl(): { [key: string]: AbstractControl } {
    return this.rvsForm.controls;
  }
  
  setValues(){
    //this.rvsControl.procedureType.setValue("");
  }
}
