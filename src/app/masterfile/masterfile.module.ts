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
import { BrandComponent } from './brand/brand.component';
import { PopupBrandComponent } from './popup/popup-brand/popup-brand.component';
import { PatienttypeComponent } from './patienttype/patienttype.component';
import { PopupPatienttypeComponent } from './popup/popup-patienttype/popup-patienttype.component';
import { PhysicalexaminationdetailComponent } from './physicalexaminationdetail/physicalexaminationdetail.component';
import { PhysicalexaminationdetailtypeComponent } from './physicalexaminationdetailtype/physicalexaminationdetailtype.component';
import { PhysicalexaminationtypeComponent } from './physicalexaminationtype/physicalexaminationtype.component';
import { PopupPhysicalexaminationdetailComponent } from './popup/popup-physicalexaminationdetail/popup-physicalexaminationdetail.component';
import { PopupPhysicalexaminationtypeComponent } from './popup/popup-physicalexaminationtype/popup-physicalexaminationtype.component';
import { PopupPhysicalexaminationdetailtypeComponent } from './popup/popup-physicalexaminationdetailtype/popup-physicalexaminationdetailtype.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { PopupDiscountsComponent } from './popup/popup-discounts/popup-discounts.component';
import { PhicmembercategoryComponent } from './phicmembercategory/phicmembercategory.component';
import { PopupPhicmembercategoryComponent } from './popup/popup-phicmembercategory/popup-phicmembercategory.component';
import { ConsultationtypeComponent } from './consultationtype/consultationtype.component';
import { PopupConsultationtypeComponent } from './popup/popup-consultationtype/popup-consultationtype.component';
import { MedicinecategoryComponent } from './medicinecategory/medicinecategory.component';
import { PopupMedicinecategoryComponent } from './popup/popup-medicinecategory/popup-medicinecategory.component';
import { AncillarydepartmentComponent } from './ancillarydepartment/ancillarydepartment.component';
import { AncillarysectionComponent } from './ancillarysection/ancillarysection.component';
import { PopupAncillarydepartmentComponent } from './popup/popup-ancillarydepartment/popup-ancillarydepartment.component';
import { PopupAncillarysectionComponent } from './popup/popup-ancillarysection/popup-ancillarysection.component';
import { ChiefcomplaintComponent } from './chiefcomplaint/chiefcomplaint.component';
import { ChiefcomplaintdetailComponent } from './chiefcomplaintdetail/chiefcomplaintdetail.component';
import { ReferralcategoryComponent } from './referralcategory/referralcategory.component';
import { ReferralcategorydetailComponent } from './referralcategorydetail/referralcategorydetail.component';
import { PopupReferralcategorydetailComponent } from './popup/popup-referralcategorydetail/popup-referralcategorydetail.component';
import { PopupReferralcategoryComponent } from './popup/popup-referralcategory/popup-referralcategory.component';
import { PopupChiefcomplaintComponent } from './popup/popup-chiefcomplaint/popup-chiefcomplaint.component';
import { PopupChiefcomplaintdetailComponent } from './popup/popup-chiefcomplaintdetail/popup-chiefcomplaintdetail.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { PopupLaboratoryComponent } from './popup/popup-laboratory/popup-laboratory.component';
import { ImmunizationtypeComponent } from './immunizationtype/immunizationtype.component';
import { PopupImmunizationtypeComponent } from './popup/popup-immunizationtype/popup-immunizationtype.component';
import { ZscoreComponent } from './zscore/zscore.component';
import { PopupZscoreComponent } from './popup/popup-zscore/popup-zscore.component';

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
    PopupSectionComponent,
    BrandComponent,
    PopupBrandComponent,
    PatienttypeComponent,
    PopupPatienttypeComponent,
    PhysicalexaminationdetailComponent,
    PhysicalexaminationdetailtypeComponent,
    PhysicalexaminationtypeComponent,
    PopupPhysicalexaminationdetailComponent,
    PopupPhysicalexaminationtypeComponent,
    PopupPhysicalexaminationdetailtypeComponent,
    DiscountsComponent,
    PopupDiscountsComponent,
    PhicmembercategoryComponent,
    PopupPhicmembercategoryComponent,
    ConsultationtypeComponent,
    PopupConsultationtypeComponent,
    MedicinecategoryComponent,
    PopupMedicinecategoryComponent,
    AncillarydepartmentComponent,
    AncillarysectionComponent,
    PopupAncillarydepartmentComponent,
    PopupAncillarysectionComponent,
    ChiefcomplaintComponent,
    ChiefcomplaintdetailComponent,
    ReferralcategoryComponent,
    ReferralcategorydetailComponent,
    PopupReferralcategorydetailComponent,
    PopupReferralcategoryComponent,
    PopupChiefcomplaintComponent,
    PopupChiefcomplaintdetailComponent,
    LaboratoryComponent,
    PopupLaboratoryComponent,
    ImmunizationtypeComponent,
    PopupImmunizationtypeComponent,
    ZscoreComponent,
    PopupZscoreComponent
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
