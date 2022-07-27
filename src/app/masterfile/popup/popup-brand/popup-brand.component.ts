import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-popup-brand',
  templateUrl: './popup-brand.component.html',
  styleUrls: ['./popup-brand.component.css']
})
export class PopupBrandComponent implements OnInit {

  brandForm : FormGroup;
  formBuilder : FormBuilder;
  brand : Brand;
  arrBrand : Brand[] = [];
  brandList : Brand[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private brandService : BrandService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.brandForm.patchValue(this.config.data.brand);
  }
  buildFormGroup() : void {
    this.formBuilder = new FormBuilder();
    this.brandForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data:Brand){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
        this.brandService.postBrand(this.getValue()).subscribe(result => {
          this.ClosePopUp(result);
        });
    }
  }
  updateData(){
    let data = this.config.data.brand;
    let obj = new Brand();
    obj.code = this.brandForm.controls['code'].value;
    obj.description = this.brandForm.controls['description'].value;
    if(this.isForUpdating){
      console.log('try', obj);
      this.brandService.putBrand(data.id, obj).subscribe({
        next : (result : Brand) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error : (err) => {
          console.log(err);
        },
        complete : () => {
          console.log('complete');
        }
      });
    }
  }
  getValue(): Brand {
    this.brand = new Brand();
    this.brand.code = this.brandForm.controls['code'].value;
    this.brand.description = this.brandForm.controls['description'].value;
    return this.brand;
  }
}
