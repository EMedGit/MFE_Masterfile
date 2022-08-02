import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalexaminationdetailComponent } from './physicalexaminationdetail.component';

describe('PhysicalexaminationdetailComponent', () => {
  let component: PhysicalexaminationdetailComponent;
  let fixture: ComponentFixture<PhysicalexaminationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalexaminationdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalexaminationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
