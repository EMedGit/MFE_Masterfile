import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DiagnosticCenter } from 'src/app/models/diagnosticcenter.model';
import { DiagnosticcenterService } from 'src/app/services/diagnosticcenter.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-diagnosticcenter',
  templateUrl: './popup-diagnosticcenter.component.html',
  styleUrls: ['./popup-diagnosticcenter.component.css']
})
export class PopupDiagnosticcenterComponent implements OnInit {

  diagnosticCenterForm: FormGroup;
  formBuilder: FormBuilder;
  diagnosticCenter: DiagnosticCenter;
  arrDiagnosticCenter: DiagnosticCenter[] = [];
  diagnosticCenterList: DiagnosticCenter[];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;
  constructor(private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private diagnosticcenterService: DiagnosticcenterService,
    private datePipe: DatePipe,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.diagnosticCenterForm.patchValue(this.config.data.diagnosticcenter);
  }
  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.diagnosticCenterForm = this.formBuilder.group(
      {
        code: [''],
        description: ['']
      });
  }
  ClosePopUp(data: DiagnosticCenter) {
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.diagnosticcenterService.GetDiagnosticCenterByCode(this.diagnosticCenterForm.controls['code'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.code.toUpperCase() == this.diagnosticCenterForm.controls['code'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Code already Exist!');
        } else {
          this.disableButton = true;
          this.diagnosticcenterService.postDiagnosticCenter(this.getValue()).subscribe({
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
  updateData() {
    let data = this.config.data.diagnosticcenter;
    let obj = new DiagnosticCenter();
    obj.code = this.diagnosticCenterForm.controls['code'].value;
    obj.description = this.diagnosticCenterForm.controls['description'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.diagnosticcenterService.putDiagnosticCenter(data.id, obj).subscribe({
        next: (result: DiagnosticCenter) => {
          obj = result;
          this.ClosePopUp(result);
        },
        error: (err) => {
          this.toastService.showError(err.error.messages);
        },
        complete: () => {
          this.toastService.showSuccess('Successfully Updated.');
        }
      });
    }
  }
  getValue(): DiagnosticCenter {
    this.diagnosticCenter = new DiagnosticCenter();
    this.diagnosticCenter.code = this.diagnosticCenterForm.controls['code'].value;
    this.diagnosticCenter.description = this.diagnosticCenterForm.controls['description'].value;
    this.diagnosticCenter.createdBy = '';
    return this.diagnosticCenter;
  }
}
