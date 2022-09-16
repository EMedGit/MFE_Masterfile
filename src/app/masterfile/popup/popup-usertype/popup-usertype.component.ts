import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserType } from 'src/app/models/usertype.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserTypeService } from 'src/app/services/usertype.service';

@Component({
  selector: 'app-popup-usertype',
  templateUrl: './popup-usertype.component.html',
  styleUrls: ['./popup-usertype.component.css']
})
export class PopupUserTypeComponent implements OnInit {

  userTypeForm: FormGroup;
  formBuilder: FormBuilder;

  userType: UserType;

  isActiveStatus=  false;
  isForSaving= false;
  isForUpdating= false;


  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private userTypeService: UserTypeService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.userType.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.userTypeForm.patchValue(this.config.data.userType)    
  }

  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.userTypeForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });

  }
  ClosePopUp(data: UserType){
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
      //this.userTypeService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
      console.log(this.getData());
    }     
  }

  
  updateData(){   

    let data = this.config.data.userType;
    data.code = this.userTypeForm.controls['code'].value;
    data.description = this.userTypeForm.controls['description'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if(this.isForUpdating){
      this.userTypeService.update(data.id, data).subscribe({
      next: (result : UserType) => {
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

  getData() : UserType {
    this.userType = new UserType();
    this.userType.code = this.userTypeForm.controls['code'].value;
    this.userType.description = this.userTypeForm.controls['description'].value;
    this.userType.createdBy = '';
    this.userType.createdDateTime = new Date();
    
    return this.userType;

  }


}
