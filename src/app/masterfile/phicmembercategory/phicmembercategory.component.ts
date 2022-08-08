import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Phicmembercategory } from 'src/app/models/phicmembercategory.model';
import { PhicmembercategoryService } from 'src/app/services/phicmembercategory.service';
import { PopupPhicmembercategoryComponent } from '../popup/popup-phicmembercategory/popup-phicmembercategory.component';

@Component({
  selector: 'app-phicmembercategory',
  templateUrl: './phicmembercategory.component.html',
  styleUrls: ['./phicmembercategory.component.css'],
  providers: [DialogService]
})
export class PhicmembercategoryComponent implements OnInit {
  searchkey: ""
  ref: DynamicDialogRef;
  phicmembercategory : Phicmembercategory;
  prevPHICMemberCategoryList : Phicmembercategory[];
  PHICMemberCategoryList : Phicmembercategory[];
  selectedPHICMemberCategory : Phicmembercategory[];

  constructor(private phicmembercategoryService : PhicmembercategoryService, private dialogService : DialogService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.phicmembercategoryService.getPhicmembercategoryList().subscribe({
      next: (result : Phicmembercategory[]) => {
        this.PHICMemberCategoryList = result;
        this.prevPHICMemberCategoryList = this.PHICMemberCategoryList.filter(x => x.status);
      },
      error : (err) => {
        console.log(err);
      },
      complete : () => {
        console.log('complete');
      }
    })
  }
  filter(){
    let filter : any[] = [];
    this.PHICMemberCategoryList.forEach(val => {
      if(val.description.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status){
        filter.push(val);
      }
    });
  }
  addPHICMemberCategoryPopup(){
    this.ref = this.dialogService.open(PopupPhicmembercategoryComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        isForSaving: true
      }
    });
    this.ref.onClose.subscribe((data : Phicmembercategory) => {
        if(data != undefined){
          this.PHICMemberCategoryList.push(data);
          this.prevPHICMemberCategoryList = this.PHICMemberCategoryList.filter(x => x.status);
        }
    });
  }
  updatePHICMemberCategoryPopUp(phicmembercategory : Phicmembercategory){
    this.ref = this.dialogService.open(PopupPhicmembercategoryComponent, {
      width: '1200px',
      height: '430px',
      showHeader: true,
      closable: true,
      data: {
        phicmembercategory,
        isForUpdating: true
      }
    });
    this.ref.onClose.subscribe((data : Phicmembercategory) => {
      if(data != undefined){
        this.PHICMemberCategoryList.forEach(val => {
          if(val.id == data.id) {
            val.code = data.code;
            val.description = data.description;
            val.status = data.status;
            val.createdBy = data.createdBy;
          }
        });
        this.prevPHICMemberCategoryList = this.PHICMemberCategoryList.filter(x => x.status);
      }
    });
  }
  removePHICMemberCategoryRecord(phicmembercategory : Phicmembercategory){
    this.phicmembercategoryService.deletePhicmembercategory(phicmembercategory.id).subscribe({
      next : (result : boolean) => {
        result;
        this.PHICMemberCategoryList.forEach(element => {
          if(phicmembercategory.id == element.id){
            element.status = false;
          }
        });
      },
      error : (err : any) => {
        console.log(err);
      },
      complete : () => {
        console.log('complete');
        this.prevPHICMemberCategoryList = this.PHICMemberCategoryList.filter(x => x.status);
      }
    });
  }
  batchdeletePHICMemberCategory(){
    if(this.selectedPHICMemberCategory.length > 0) {
      this.selectedPHICMemberCategory.forEach(val => {
        val.modifiedBy = '';
        val.modifiedDateTime = this.datePipe.transform(
          new Date(), 'yyyy-MM-ddTHH:mm:ss'
        ) as string;
        val.status = false;
      });
      this.phicmembercategoryService.batchdeletePhicmembercategory(this.selectedPHICMemberCategory).subscribe({
        next : (result : boolean) => {
          if(result) {
            this.PHICMemberCategoryList.forEach(val => {
              let x = this.selectedPHICMemberCategory.find(x => x.id == val.id);
              if(x != undefined && x != null){
                val.status = false;
              }
            });
          }
        },
        error : (err : any) => {
          console.log(err);
        },
        complete : () => {
          console.log('complete');
          this.prevPHICMemberCategoryList = this.PHICMemberCategoryList.filter(x => x.status);
        }
      });
    }
  }
}
