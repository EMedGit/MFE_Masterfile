
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BarangayComponent } from './barangay/barangay.component';
import { CivilstatusComponent } from './civilstatus/civilstatus.component';
<<<<<<< HEAD
import { DepartmentComponent } from './department/department.component';
=======
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
import { HealthfacilityComponent } from './healthfacility/healthfacility.component';
import { IcdComponent } from './icd/icd.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MenuComponent } from './menu/menu.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { ProvinceComponent } from './province/province.component';
import { RvsComponent } from './rvs/rvs.component';
import { SectionComponent } from './section/section.component';

const routes: Routes = [
  { path: 'rvs', component: RvsComponent },
  { path: 'address', component: AddressComponent },
  { path: 'menu', component: MenuComponent,
    children: [{ path: 'icd', component: IcdComponent },
              { path: 'rvs', component: RvsComponent },
              { path: 'medicine', component: MedicineComponent },
              { path: 'province', component: ProvinceComponent },
              { path: 'municipality', component: MunicipalityComponent },
              { path: 'barangay', component: BarangayComponent },
              { path: 'immunization', component: ImmunizationComponent },
<<<<<<< HEAD
              { path: 'civilStatus', component: CivilstatusComponent}, 
              { path: 'healthfacility', component: HealthfacilityComponent},
              { path: 'department', component: DepartmentComponent},
              { path: 'section', component: SectionComponent}
            ] },
=======
              { path: 'civilStatus', component: CivilstatusComponent}, { path: 'healthfacility', component: HealthfacilityComponent}] },
>>>>>>> 951bb33ea59638b0ec81316e9afecbdbad1d5c42
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterfileRoutingModule { }
