import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItemGroup } from "primeng/api";
import { Masterfile } from 'src/app/models/menu.model';
import {MegaMenuModule} from 'primeng/megamenu';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  masterfiles: Masterfile[] = [];
  selectedMasterfile: Masterfile;
  countries: any[];
  selectedCountries: any[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 

    this.masterfiles = [
      {name: 'Ancillary Department', code: "[ancillarydepartment]", routerLink: "/ancillarydepartment"},
      {name: 'Ancillary Section', code: "[ancillarysection]", routerLink: "/ancillarysection"},
      {name: 'Barangay', code: "[barangay]", routerLink: "/barangay"},
      {name: 'Brand', code: "[brand]", routerLink: "/brand"},
      {name: 'Chief Complaint', code: "[chiefcomplaint]", routerLink: "/chiefcomplaint"},
      // {name: 'Chief Complaint Details', code: "[chiefcomplaintdetail]", routerLink: "/chiefcomplaintdetail"},
      {name: 'Civil Status', code: "[civilStatus]", routerLink: "/civilStatus" },
      {name: 'Consultation Type', code: "consultationtype", routerLink: "/consultationtype"},
      {name: 'Department', code: "['department']", routerLink: "/department"},
      {name: 'Diagnostics', code: "['diagnosticCenter']", routerLink: "/diagnosticCenter"},
      {name: 'Discounts', code: "[discounts]", routerLink: "/discounts"},
      // {name: 'Doctors', code: "['icd']", routerLink: "/address"},
      {name: 'Health Facility', code: "['healthfacility']", routerLink: "/healthfacility"},
      {name: 'ICD10', code: "['icd']", routerLink: "/icd"},
      {name: 'Immunization', code: "['immunization']", routerLink: "/immunization"},
      {name: 'Immunization Type', code: "['immunizationtype']", routerLink: "/immunizationtype"},
      {name: 'Laboratory', code: "laboratory", routerLink: "/laboratory"},
      {name: 'Medicine', code: "['medicine']", routerLink: "/medicine"},
      {name: 'Medicine Category', code: "[medicinecategory]", routerLink: "/medicinecategory"},
      {name: 'Municipality', code: "['municipality']", routerLink: "/municipality"},
      {name: 'Pharmacy', code: "['pharmacy']", routerLink: "/pharmacy"},
      {name: 'Patient Type', code: "[patientType]", routerLink: "/patientType"},
      {name: 'PE Sketch', code: "['icd']", routerLink: "/medicine"},
      {name: 'PHIC Member Category', code: "[phicmembercategory]", routerLink: "/phicmembercategory"},
      {name: 'Physical Examination Detail', code: "['physicalexaminationdetail']", routerLink: "/physicalexaminationdetail"},
      // {name: 'Physical Examination Detail Type', code: "['physicalexaminationdetailtype']", routerLink: "/physicalexaminationdetailtype"},
      {name: 'Physical Examination Sketch', code: "['physicalexaminationsketch']", routerLink: "/physicalexaminationsketch"},
      {name: 'Physical Examination Type', code: "['physicalexaminationtype']", routerLink: "/physicalexaminationtype"},
      {name: 'Province', code: "['province']", routerLink: "/province"},
      {name: 'Radiology', code: "['radiology']", routerLink: "/radiology"},
      {name: 'Referral Category', code: "[referralcategory]", routerLink: "/referralcategory"},
      {name: 'Referral Category Detail', code: "[referralcategorydetail]", routerLink: "/referralcategorydetail"},
      {name: 'Region', code: "['region']", routerLink: "/region"},
      {name: 'RVS', code: "['icd']", routerLink: "/rvs"},
      {name: 'Section', code: "['section']", routerLink: "/section"},
      {name: 'Users', code: "['users']", routerLink: "/users"},
      {name: 'UserType', code: "['usertype']", routerLink: "/usertype"},
      {name: 'Z-Score', code: "['zscore']", routerLink: "/zscore"}
    ]

    this.countries = [
      { name: "Australia", code: "AU", routerLink: "/icd" },
      { name: "Brazil", code: "BR", routerLink: "/icd" },
      { name: "China", code: "CN", routerLink: "/icd" },
      { name: "Egypt", code: "EG", routerLink: "/icd" },
      { name: "France", code: "FR", routerLink: "/icd" },
      { name: "Germany", code: "DE", routerLink: "/icd" },
      { name: "India", code: "IN", routerLink: "/icd" },
      { name: "Japan", code: "JP", routerLink: "/icd" },
      { name: "Spain", code: "ES", routerLink: "/icd" },
      { name: "United States", code: "US", routerLink: "/icd" }
    ];
  
  }

  ngOnInit(): void {
  }
  selectedMastefiles(event: any): void {
    let toRoute = 'masterfile/menu' + event.routerLink;
    this.router.navigate([toRoute]);
  }

}
