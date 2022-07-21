import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BarangayComponent } from './barangay/barangay.component';
import { CivilstatusComponent } from './civilstatus/civilstatus.component';
import { IcdComponent } from './icd/icd.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MenuComponent } from './menu/menu.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { ProvinceComponent } from './province/province.component';
import { RvsComponent } from './rvs/rvs.component';

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
              { path: 'civilStatus', component: CivilstatusComponent}] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterfileRoutingModule { }
