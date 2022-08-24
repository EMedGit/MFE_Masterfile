import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalexaminationsketchComponent } from './physicalexaminationsketch.component';

describe('PhysicalexaminationsketchComponent', () => {
  let component: PhysicalexaminationsketchComponent;
  let fixture: ComponentFixture<PhysicalexaminationsketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalexaminationsketchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalexaminationsketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
