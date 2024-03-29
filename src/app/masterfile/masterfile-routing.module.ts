
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BrandComponent } from './brand/brand.component';
import { CivilstatusComponent } from './civilstatus/civilstatus.component';
import { DepartmentComponent } from './department/department.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { HealthfacilityComponent } from './healthfacility/healthfacility.component';
import { IcdComponent } from './icd/icd.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MenuComponent } from './menu/menu.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { PatienttypeComponent } from './patienttype/patienttype.component';
import { ProvinceComponent } from './province/province.component';
import { RvsComponent } from './rvs/rvs.component';
import { SectionComponent } from './section/section.component';
import { PhysicalexaminationdetailComponent } from './physicalexaminationdetail/physicalexaminationdetail.component';
import { PhysicalexaminationdetailtypeComponent } from './physicalexaminationdetailtype/physicalexaminationdetailtype.component';
import { PhysicalexaminationtypeComponent } from './physicalexaminationtype/physicalexaminationtype.component';
import { PhicmembercategoryComponent } from './phicmembercategory/phicmembercategory.component';
import { ConsultationtypeComponent } from './consultationtype/consultationtype.component';
import { MedicinecategoryComponent } from './medicinecategory/medicinecategory.component';
import { AncillarydepartmentComponent } from './ancillarydepartment/ancillarydepartment.component';
import { AncillarysectionComponent } from './ancillarysection/ancillarysection.component';
import { ImmunizationtypeComponent } from './immunizationtype/immunizationtype.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { ChiefcomplaintComponent } from './chiefcomplaint/chiefcomplaint.component';
import { ChiefcomplaintdetailComponent } from './chiefcomplaintdetail/chiefcomplaintdetail.component';
import { ReferralcategoryComponent } from './referralcategory/referralcategory.component';
import { ReferralcategorydetailComponent } from './referralcategorydetail/referralcategorydetail.component';
import { DiagnosticcenterComponent } from './diagnosticcenter/diagnosticcenter.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { UsersComponent } from './users/users.component';
import { ZscoreComponent } from './zscore/zscore.component';
import { RadiologyComponent } from './radiology/radiology.component';
import { PhysicalexaminationsketchComponent } from './physicalexaminationsketch/physicalexaminationsketch.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { BarangayComponent } from './barangay/barangay.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  { path: 'rvs', component: RvsComponent },
  { path: 'address', component: AddressComponent },
  { path: 'menu', component: MenuComponent,
    children: [{ path: 'icd', component: IcdComponent },
              { path: 'rvs', component: RvsComponent },
              { path: 'medicine', component: MedicineComponent },
              { path: 'province', component: ProvinceComponent },
              { path: 'municipality', component: MunicipalityComponent },
              { path: 'immunization', component: ImmunizationComponent },
              { path: 'civilStatus', component: CivilstatusComponent}, 
              { path: 'healthfacility', component: HealthfacilityComponent},
              { path: 'department', component: DepartmentComponent},
              { path: 'section', component: SectionComponent},
              { path: 'brand', component : BrandComponent },
              { path: 'patientType', component : PatienttypeComponent },
              { path: 'physicalexaminationdetail', component: PhysicalexaminationdetailComponent},
              { path: 'physicalexaminationdetailtype', component: PhysicalexaminationdetailtypeComponent},
              { path: 'physicalexaminationtype', component: PhysicalexaminationtypeComponent},
              { path: 'discounts', component : DiscountsComponent },
              { path: 'phicmembercategory', component : PhicmembercategoryComponent },
              { path: 'consultationtype', component : ConsultationtypeComponent },
              { path: 'medicinecategory', component : MedicinecategoryComponent },
              { path: 'ancillarydepartment', component : AncillarydepartmentComponent },
              { path: 'ancillarysection', component : AncillarysectionComponent },
              { path: 'immunizationtype', component : ImmunizationtypeComponent},
              { path: 'chiefcomplaint', component : ChiefcomplaintComponent },
              { path: 'chiefcomplaintdetail', component : ChiefcomplaintdetailComponent },
              { path: 'referralcategory', component : ReferralcategoryComponent },
              { path: 'referralcategorydetail', component : ReferralcategorydetailComponent },
              { path: 'laboratory', component : LaboratoryComponent},
              { path: 'diagnosticCenter', component : DiagnosticcenterComponent },
              { path: 'users', component : UsersComponent },              
              { path: 'zscore', component: ZscoreComponent},
              { path: 'pharmacy', component : PharmacyComponent },
              { path: 'radiology', component : RadiologyComponent },
              { path: 'physicalexaminationsketch', component: PhysicalexaminationsketchComponent},
              { path: 'usertype', component: UsertypeComponent} ,
              { path: 'barangay', component : BarangayComponent },
              { path: 'region', component : RegionComponent }       
            ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterfileRoutingModule { }
