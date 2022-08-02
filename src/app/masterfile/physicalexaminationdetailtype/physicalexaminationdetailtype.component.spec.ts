import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalexaminationdetailtypeComponent } from './physicalexaminationdetailtype.component';

describe('PhysicalexaminationdetailtypeComponent', () => {
  let component: PhysicalexaminationdetailtypeComponent;
  let fixture: ComponentFixture<PhysicalexaminationdetailtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalexaminationdetailtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalexaminationdetailtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
