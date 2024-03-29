import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Phicmembercategory } from 'src/app/models/phicmembercategory.model';
import { PhicmembercategoryService } from 'src/app/services/phicmembercategory.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-phicmembercategory',
  templateUrl: './popup-phicmembercategory.component.html',
  styleUrls: ['./popup-phicmembercategory.component.css']
})
export class PopupPhicmembercategoryComponent implements OnInit {

  phicmembercategoryForm : FormGroup;
  formBuilder : FormBuilder;
  phicmembercategory : Phicmembercategory;
  arrPhicmembercategory : Phicmembercategory[] = [];
  phicmembercategoryList : Phicmembercategory[];
  id : number = 0;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;
  disableButton = false;

  constructor(private ref : DynamicDialogRef, private config : DynamicDialogConfig, private phicmembercategoryService : PhicmembercategoryService, private datePipe : DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.phicmembercategoryForm.patchValue(this.config.data.phicmembercategory);

  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.phicmembercategoryForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data:Phicmembercategory){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData(){
    if(this.isForSaving){
      this.phicmembercategoryService.GetPHICMemberCategoryByCode(this.phicmembercategoryForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.phicmembercategoryForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
        this.disableButton = true;
        this.phicmembercategoryService.postPhicmembercategory(this.getValue()).subscribe({
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
    let data = this.config.data.phicmembercategory;
    let obj = new Phicmembercategory();
    obj.code = this.phicmembercategoryForm.controls['code'].value;
    obj.description = this.phicmembercategoryForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if(this.isForUpdating){
      this.phicmembercategoryService.putPhicmembercategory(data.id, obj).subscribe({
        next : (result : Phicmembercategory) => {
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

  getValue(): Phicmembercategory {
    this.phicmembercategory = new Phicmembercategory();
    this.phicmembercategory.code = this.phicmembercategoryForm.controls['code'].value;
    this.phicmembercategory.description = this.phicmembercategoryForm.controls['description'].value;
    return this.phicmembercategory;
  }
}
