import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ZScore } from 'src/app/models/zscore.model';
import { ToastService } from 'src/app/services/toast.service';
import { ZScoreService } from 'src/app/services/zscore.service';

@Component({
  selector: 'app-popup-zscore',
  templateUrl: './popup-zscore.component.html',
  styleUrls: ['./popup-zscore.component.css']
})
export class PopupZscoreComponent implements OnInit {

  zScoreForm: FormGroup;
  formBuilder: FormBuilder;

  zScore: ZScore;

  isActiveStatus =  false;
  isForSaving = false;
  isForUpdating = false;

  genderList = [
    {code: 'M', description: 'MALE'},
    {code: 'F', description: 'FEMALE'}
   ]
  // let selectedGender = this.genderList;

  constructor(private ref: DynamicDialogRef,  private config: DynamicDialogConfig, private zScoreService: ZScoreService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.zScore.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.zScoreForm.patchValue(this.config.data.zScore);

  }
  
  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.zScoreForm = this.formBuilder.group(
      {
        resultCode: [''],
        zScoreType: [''],
        gender: [''],
        length: null,
        weight: null,
        months: null
      });
  }

  ClosePopUp(data : ZScore){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.zScoreService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }
  }

  getData() : ZScore {
    this.zScore = new ZScore();
    this.zScore.resultCode = this.zScoreForm.controls['resultCode'].value;
    this.zScore.zScoreType = this.zScoreForm.controls['zScoreType'].value;
    this.zScore.gender = this.zScoreForm.controls['gender'].value.code;
    this.zScore.length = this.zScoreForm.controls['length'].value;
    this.zScore.weight = this.zScoreForm.controls['weight'].value;
    this.zScore.months = this.zScoreForm.controls['months'].value;
    this.zScore.createdBy = '';
    this.zScore.createdDateTime = new Date();
    return this.zScore;
  }

  updateData() {
    let data = this.config.data.zScore;
    data.resultCode = this.zScoreForm.controls['resultCode'].value;
    data.zScoreType = this.zScoreForm.controls['zScoreType'].value;
    data.gender = this.zScoreForm.controls['gender'].value.code;
    data.length = this.zScoreForm.controls['length'].value;
    data.weight = this.zScoreForm.controls['weight'].value;
    data.months = this.zScoreForm.controls['months'].value;
    data.modifiedBy = '';
    data.modifiedDateTime = new Date();
    if (this.isForUpdating) {
      this.zScoreService.update(data.id, data).subscribe({
        next: (result: ZScore) => {
          data = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('update complete');
        }
      });
    }
  }

}
