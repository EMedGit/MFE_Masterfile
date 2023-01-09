import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Barangay } from 'src/app/models/barangay.model';
import { Municipality } from 'src/app/models/municipality.model';
import { Province } from 'src/app/models/province.model';
import { Region } from 'src/app/models/region.model';
import { AddressService } from 'src/app/services/address.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-popup-barangay',
  templateUrl: './popup-barangay.component.html',
  styleUrls: ['./popup-barangay.component.css']
})
export class PopupBarangayComponent implements OnInit {

  barangayForm: FormGroup;
  formBuilder: FormBuilder;
  barangay: Barangay;
  arrBarangay: Barangay[] = [];
  barangayList: Barangay[];
  region: Region[] = [];
  province: Province[] = [];
  municipality: Municipality[] = [];
  id: number = 0;

  isActiveStatus = false;
  isForSaving = false;
  isForUpdating = false;
  disableButton = false;
  address = new BehaviorSubject<Address>(new Address());
  outputAddress: EventEmitter<Address> = new EventEmitter<Address>();
  outputAddressForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private addressService: AddressService, private datePipe: DatePipe, private toastService: ToastService) { }

  ngOnInit(): void {
    this.isForUpdating = this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;
    this.buildFormGroup();
    this.onValueChanges();
    this.loadData();
    this.barangayForm.patchValue(this.config.data.barangay);
    this.emit();
  }

  buildFormGroup() {
    this.formBuilder = new FormBuilder();
    this.barangayForm = this.formBuilder.group(
      {
        barangayCode: [''],
        barangayName: [''],
        regionCode: [null, Validators.required],
        provinceCode: [null, Validators.required],
        municipalityCode: [null, Validators.required],
        zipcode: ['', Validators.required]
      });
  }
  loadData(): void {
    let data = this.config.data.barangay;
    this.addressService.GetRegionById(0).subscribe(retval => {
      return this.region = retval;
    });
    this.addressService.GetProvinceByCode('').subscribe(retVal => {
      this.province = retVal;
    });
  }
  emit(): void {
    this.outputAddressForm.emit(this.barangayForm);
    this.address.subscribe((value) => {
      this.outputAddress.emit(value)
    });
  }
  ClosePopUp(data: Barangay) {
    this.ref.close(data);
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  saveData() {
    if (this.isForSaving) {
      this.addressService.GetBarangayAddressByCode(this.barangayForm.controls['barangayCode'].value).subscribe(retVal => {
        let obj = retVal.find(x => x.barangayCode.toUpperCase() == this.barangayForm.controls['barangayCode'].value.toUpperCase())
        if (obj != undefined) {
          this.toastService.showError('Barangay Code already Exist!');
        } else {
          this.disableButton = true;
          this.addressService.postBarangay(this.getValue()).subscribe({
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
    let data = this.config.data.barangay;
    let obj = new Barangay();
    obj.barangayCode = this.barangayForm.controls['barangayCode'].value;
    obj.barangayName = this.barangayForm.controls['barangayName'].value;
    obj.provinceCode = this.barangayForm.controls['provinceCode'].value;
    obj.municipalityCode = this.barangayForm.controls['municipalityCode'].value;
    obj.zipCode = this.barangayForm.controls['zipcode'].value;
    obj.modifiedDateTime = this.datePipe.transform(
      new Date(), 'yyyy-MM-ddTHH:mm:ss'
    ) as string;
    if (this.isForUpdating) {
      this.addressService.putBarangay(data.id, obj).subscribe({
        next: (result: Barangay) => {
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
  getValue(): Barangay {
    this.barangay = new Barangay();
    this.barangay.barangayCode = this.barangayForm.controls['barangayCode'].value;
    this.barangay.barangayName = this.barangayForm.controls['barangayName'].value;
    this.barangay.provinceCode = this.barangayForm.controls['provinceCode'].value;
    this.barangay.municipalityCode = this.barangayForm.controls['municipalityCode'].value;
    this.barangay.zipCode = this.barangayForm.controls['zipcode'].value;
    this.barangay.createdBy = 'admin';
    return this.barangay;
  }
  onValueChanges(): void {
    this.barangayForm.valueChanges.subscribe(value => {
      value.provinceName = this.province.find(t => t.provinceCode == value.provinceCode)?.provinceName ?? null;
      value.municipalityName = this.municipality.find(t => t.municipalityCode == value.municipalityCode)?.municipalityName ?? null;
      this.address.next(Object.assign(value));
    });
    this.barangayForm.get('provinceCode')?.valueChanges.subscribe(provinceCode => {
      if (provinceCode == null) {
        this.barangayForm.patchValue({
          regionCode: null,
          municipalityCode: null,
          barangayCode: null
        });
        this.municipality = [];
        return;
      }
      let region = this.region.find(t => t.regionCode == this.province.find(t => t.provinceCode == provinceCode)?.regionCode);
      if (region != null) {
        this.barangayForm.patchValue({
          regionCode: region.regionCode
        });
      }
      this.addressService.GetMunicipalityByCode(provinceCode).subscribe(retVal => {
        this.municipality = retVal;
      })
    });
  }
}
