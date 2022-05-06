import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupAddressComponent } from '../popup/popup-address/popup-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [DialogService]
})
export class AddressComponent implements OnInit , OnDestroy{
  ref: DynamicDialogRef;
  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  showPopup() {
    this.ref = this.dialogService.open(PopupAddressComponent, {
      width: '530px',
      height: '520px',
      showHeader: false
    });
  }
}
