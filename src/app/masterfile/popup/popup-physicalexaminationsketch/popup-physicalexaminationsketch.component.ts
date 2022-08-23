import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Department } from 'src/app/models/department.model';
import { HealthFacility } from 'src/app/models/healthfacility.model';
import { PhysicalExaminationSketch } from 'src/app/models/physicalexaminationsketch.model';
import { Section } from 'src/app/models/section.model';
import { DepartmentService } from 'src/app/services/department.service';
import { HealthFacilityService } from 'src/app/services/healthfacility.service';
import { PhysicalExaminationSketchService } from 'src/app/services/physicalexaminationsketch.service';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-popup-physicalexaminationsketch',
  templateUrl: './popup-physicalexaminationsketch.component.html',
  styleUrls: ['./popup-physicalexaminationsketch.component.css']
})
export class PopupPhysicalexaminationsketchComponent implements OnInit {

  peSketchForm: FormGroup;
  formBuilder: FormBuilder;

  physicalExaminationSketch: PhysicalExaminationSketch;

  isActiveStatus =  false;
  isForSaving = false;
  isForUpdating = false;

  hfList: HealthFacility[];
  ddHFList: HealthFacility[];
  selectedHF: HealthFacility;

  departmentList: Department[];
  ddDepartmentList: Department[];
  selectedDepartment: Department;

  sectionList: Section [];
  ddSectionList: Section[];
  selectedSection: Section;

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingimage: string;
  capturepic: string;
  hasimage: boolean = false;

  constructor(private ref: DynamicDialogRef,  private config: DynamicDialogConfig, private pesService: PhysicalExaminationSketchService, 
    private departmentService: DepartmentService, private hfService: HealthFacilityService, private sectionService: SectionService) { }

  ngOnInit(): void {
    this.isActiveStatus = this.config.data.physicalExaminationSketch.status;
    this.isForUpdating= this.config.data.isForUpdating;
    this.isForSaving = this.config.data.isForSaving;

    this.buildFormGroup();
    this.peSketchForm.patchValue(this.config.data.physicalExaminationSketch);
  }

  buildFormGroup(): void {
    this.formBuilder = new FormBuilder();
    this.peSketchForm = this.formBuilder.group(
    {
      description: [''],
      picturePath: [''],
      consultationId: null,
      healthFacilityId: null,
      departmentId: null,
      sectionId: null
    });
    
    this.hfService.getHealthFacility('','',0,100).subscribe({
      next: (result: HealthFacility[]) => {
        this.hfList = result;
         this.ddHFList = this.hfList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('dropdown hf complete');
        console.log(this.hfList);
      }
    });
    this.departmentService.getDepartments('','',0,0,100).subscribe({
      next: (result: Department[]) => {
        this.departmentList = result;
        this.departmentList = this.departmentList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('dropdown departmentlist complete');
        console.log(this.departmentList);
      }
    });
    this.sectionService.getSections('','',0,0,100).subscribe({
      next: (result: Section[]) => {
        this.sectionList = result;
        this.sectionList = this.sectionList.filter(x => x.status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('dropdown sectionList complete');
        console.log(this.departmentList);
      }
    });
      
  }

  ClosePopUp(data : PhysicalExaminationSketch){
    this.ref.close(data);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  saveData() {
    if (this.isForSaving) {
      this.pesService.insert(this.getData()).subscribe((retval) => { this.ClosePopUp(retval); });
    }
  }

  getData() : PhysicalExaminationSketch {
    let pes = new PhysicalExaminationSketch();
    pes.description = this.peSketchForm.controls['description'].value;
    pes.picturePath = this.peSketchForm.controls['picturePath'].value;
    pes.healthFacilityId =this.selectedHF.id;
    pes.departmentId = this.selectedDepartment.id;
    pes.sectionId = this.selectedSection.id;
    return pes;
  }

  updateData() {

  }

  changeHF() {
    this.ddDepartmentList = this.departmentList.filter(x => x.status && x.healthFacilityId == this.selectedHF.id);
    console.log(this.ddDepartmentList);

  }

  changeDept() {
    this.ddSectionList = this.sectionList.filter(x => x.status && x.departmentID == this.selectedDepartment.id);
    console.log(this.ddSectionList);

  }

  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile != null || this.selectedFile != undefined) {
      reader.readAsDataURL(this.selectedFile);
      this.existingimage = 'SAVE IMAGE';
      this.capturepic = 'CAPTURE';
      this.hasimage = true;
    } 
    else {
      this.existingimage = 'EXISTING IMAGE';
      this.capturepic = 'SAVE IMAGE';
      this.hasimage = false;
    }

  }


}