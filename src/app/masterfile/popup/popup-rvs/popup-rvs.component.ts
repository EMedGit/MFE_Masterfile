import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RVS } from 'src/app/models/rvs.model';
import { SpecialProcedure } from 'src/app/models/specialProcedure.model';
import { RVSService } from 'src/app/services/rvs.service';

@Component({
  selector: 'app-popup-rvs',
  templateUrl: './popup-rvs.component.html',
  styleUrls: ['./popup-rvs.component.css']
})
export class PopupRvsComponent implements OnInit {
  
  rvsForm: FormGroup;
  formBuilder: FormBuilder;
  rvs: RVS;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  
  specialProcedures: SpecialProcedure[];
  selectedSpecialProcedure: SpecialProcedure;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private rvsService: RVSService) {

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
        description: [''],
        caseRateAmount: [''],
        hospitalFee: [''],
        professionalFee: [''],
        caseRateAmount2: [''],
        hospitalFee2: [''],
        professionalFee2: [''],
        allowSingleConfinement: [''],
        noOfDays: [''],
        specialProcedure: [''],
        procedureType: ['']
      });
  }

  get rvsControl(): { [key: string]: AbstractControl } {
    return this.rvsForm.controls;
  }  
  
  ClosePopUp(data: RVS) {
    console.log(this.ref);
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      console.log(this.getData());
      this.rvsService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }
  }

  updateData() {
    let specialProcedure = new String();
    if (this.selectedSpecialProcedure != undefined)
    {
      specialProcedure = this.selectedSpecialProcedure.name || '';
    }

    let data = this.config.data.rvs;
    data.category = this.rvsForm.controls['category'].value;
    data.code = this.rvsForm.controls['code'].value;
    data.description = this.rvsForm.controls['description'].value;
    data.caseRateAmount = this.rvsForm.controls['caseRateAmount'].value;
    data.hospitalFee = this.rvsForm.controls['hospitalFee'].value;
    data.professionalFee = this.rvsForm.controls['professionalFee'].value;
    data.caseRateAmount2 = this.rvsForm.controls['caseRateAmount2'].value;
    data.hospitalFee2 = this.rvsForm.controls['hospitalFee2'].value;
    data.professionalFee2 = this.rvsForm.controls['professionalFee2'].value;
    data.specialProcedure = this.rvsForm.controls['specialProcedure'].value;
    data.procedureType = specialProcedure;
    data.allowSingleConfinement = this.rvsForm.controls['allowSingleConfinement'].value;
    data.noOfDays = this.rvsForm.controls['noOfDays'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();

    if (this.isForUpdating) {
      this.rvsService.update(data.id, data).subscribe({
        next: (result: RVS) => {
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

  getData(): RVS {
    this.rvs = new RVS();
    this.rvs.category = this.rvsForm.controls['category'].value;
    this.rvs.code = this.rvsForm.controls['code'].value;
    this.rvs.description = this.rvsForm.controls['description'].value;
    this.rvs.caseRateAmount = this.rvsForm.controls['caseRateAmount'].value;
    this.rvs.hospitalFee = this.rvsForm.controls['hospitalFee'].value;
    this.rvs.professionalFee = this.rvsForm.controls['professionalFee'].value;
    this.rvs.caseRateAmount2 = this.rvsForm.controls['caseRateAmount2'].value;
    this.rvs.hospitalFee2 = this.rvsForm.controls['hospitalFee2'].value;
    this.rvs.professionalFee2 = this.rvsForm.controls['professionalFee2'].value;
    this.rvs.specialProcedure = this.rvsForm.controls['specialProcedure'].value;
    this.rvs.procedureType = this.selectedSpecialProcedure.name || '';
    this.rvs.allowSingleConfinement = this.rvsForm.controls['allowSingleConfinement'].value;
    this.rvs.noOfDays = this.rvsForm.controls['noOfDays'].value;
    this.rvs.createdBy = '';
    this.rvs.createdDateTime = new Date();
    return this.rvs;
  }


  setValues(){
    //this.rvsControl.procedureType.setValue("");
  }
}
