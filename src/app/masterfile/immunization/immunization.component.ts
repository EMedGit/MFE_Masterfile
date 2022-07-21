import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Immunization } from 'src/app/models/immunization.model';
import { ImmunizationService } from 'src/app/services/immunization.service';
import { PopupImmunizationComponent } from '../popup/popup-immunization/popup-immunization.component';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css'],
  providers: [DialogService]
})
export class ImmunizationComponent implements OnInit {

  ref: DynamicDialogRef;
  immunization: Immunization;
  immunizations: Immunization[];
  selectedImmunizations: Immunization[];

  constructor(private immunizationService: ImmunizationService, private dialogService: DialogService) { }

  ngOnInit(): void {
    //this.immunizationService.getImmunization('','',0,1,100).then(data => this.immunizations = data);
    this.fetchData();
  }

  fetchData(){
    try{
      this.immunizationService
      .getImmunization('','',0,1,100)
      .subscribe((retval : Immunization[]) => {
          console.log(retval);
          this.immunizations = retval;
      });

    } catch (error){
      console.log

    }

  }
  addImmunizationPopup(){
    //this.ref = 
      this.dialogService.open(PopupImmunizationComponent, {
      width: '1000px',
      height: '430px',
      showHeader: false,
      closable: true,
      data: {
        immunization: {},
        isForSaving: true
      }
    }
    )

  }
  filter(value: any){
    this.immunizations.every(a => a.description?.includes(value.key));
  }

  updateImmunizationPopUp(immunization : Immunization){
  }

  
}
