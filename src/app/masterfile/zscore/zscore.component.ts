import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZScore } from 'src/app/models/zscore.model';
import { ZScoreService } from 'src/app/services/zscore.service';
import { PopupZscoreComponent } from '../popup/popup-zscore/popup-zscore.component';

@Component({
  selector: 'app-zscore',
  templateUrl: './zscore.component.html',
  styleUrls: ['./zscore.component.css'],
  providers: [DialogService]
})
export class ZscoreComponent implements OnInit {
  searchkey: "";
  ref: DynamicDialogRef;
  zScore: ZScore;
  zScoreList: ZScore[];
  selectedZScoreList: ZScore[];
  newZScoreList: ZScore[];

  constructor(private zScoreService: ZScoreService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.zScoreService.getList(0,0,0,'',0,9999999).subscribe({
      next: (result: ZScore[]) => {
        this.zScoreList = result;
        this.newZScoreList = this.zScoreList.filter(x => x.status);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('getdata complete');
      }
    });
  }

  filter() {
    console.log(this.selectedZScoreList);
    let filter: any[] = [];
    this.newZScoreList.forEach(val => {
      console.log(val)
      if (val.resultCode.toUpperCase().includes(this.searchkey.toUpperCase()) && val.status) {
        filter.push(val);      
      }

    });
    console.log(filter)
    this.newZScoreList = filter;
  }


  addPopup()
  {
    this.ref = this.dialogService.open(PopupZscoreComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        zScore: {},
        isForSaving: true
      }
    })
    this.ref.onClose.subscribe((data: ZScore) => {
      if (data != undefined) {
        this.zScoreList.push(data);
        this.newZScoreList = this.zScoreList.filter(x => x.status);
      }
    })
  }
  
  updatePopUp(zScore: ZScore){
    this.ref = this.dialogService.open(PopupZscoreComponent, {
      width: '1000px',
      height: '600px',
      showHeader: true,
      closable: true,
      data: {
        zScore,
        isForUpdating: true
      }      
    })
    this.ref.onClose.subscribe((data: ZScore) => {
      if (data != undefined) {
        this.zScoreList.forEach(val => {
          if (val.id == data.id) {
            val = data;
          }
        });
        this.newZScoreList = this.zScoreList.filter(x => x.status);
      }
    })
  }

  removeItem(zScore : ZScore) {
    this.zScoreService.delete(zScore.id).subscribe({
      next : (result : boolean) => {
        result;
        this.zScoreList.forEach(element => {
          if (zScore.id == element.id)
          {
            element.status = false;
          }
        });
      },
      error : (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        this.newZScoreList = this.zScoreList.filter(x => x.status);
      }
    });
  }


}
