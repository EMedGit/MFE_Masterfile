import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterfileRoutingModule } from './masterfile-routing.module';
import { RvsComponent } from './rvs/rvs.component';
import { IcdComponent } from './icd/icd.component';
import { AddressComponent } from './address/address.component';
import { ButtonModule } from 'primeng/button';
import { PopupAddressComponent } from './popup/popup-address/popup-address.component';
import { PopupIcdComponent } from './popup/popup-icd/popup-icd.component';
import { PopupRvsComponent } from './popup/popup-rvs/popup-rvs.component';
import { DialogModule } from 'primeng/dialog';
import { MenuComponent } from './menu/menu.component';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MedicineComponent } from './medicine/medicine.component';
import { PopupMedicineComponent } from './popup/popup-medicine/popup-medicine.component';
import { ProvinceComponent } from './province/province.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { BarangayComponent } from './barangay/barangay.component';
import { PopupProvinceComponent } from './popup/popup-province/popup-province.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { PopupImmunizationComponent } from './popup/popup-immunization/popup-immunization.component';
import { CivilstatusComponent } from './civilstatus/civilstatus.component';
import { PopupCivilstatusComponent } from './popup/popup-civilstatus/popup-civilstatus.component';
import { HealthfacilityComponent } from './healthfacility/healthfacility.component';
import { PopupHealthfacilityComponent } from './popup/popup-healthfacility/popup-healthfacility.component';
import { DepartmentComponent } from './department/department.component';
import { PopupDepartmentComponent } from './popup/popup-department/popup-department.component';
import { SectionComponent } from './section/section.component';
import { PopupSectionComponent } from './popup/popup-section/popup-section.component';

@NgModule({
  declarations: [
    RvsComponent,
    IcdComponent,
    AddressComponent,
    PopupAddressComponent,
    PopupIcdComponent,
    PopupRvsComponent,
    MenuComponent,
    MedicineComponent,
    PopupMedicineComponent,
    ProvinceComponent,
    MunicipalityComponent,
    BarangayComponent,
    PopupProvinceComponent,
    ImmunizationComponent,
    PopupImmunizationComponent,
    CivilstatusComponent,
    PopupCivilstatusComponent,
    HealthfacilityComponent,
    PopupHealthfacilityComponent,
    DepartmentComponent,
    PopupDepartmentComponent,
    SectionComponent,
    PopupSectionComponent
  ],
  imports: [
    CommonModule,
    MasterfileRoutingModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    InputTextModule,
    HttpClientModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextareaModule,
    CheckboxModule,
    ReactiveFormsModule,
    MessageModule,
    TooltipModule,
    DropdownModule
  ]
})
export class MasterfileModule { }
