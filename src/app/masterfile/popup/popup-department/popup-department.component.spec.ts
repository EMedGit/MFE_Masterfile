import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDepartmentComponent } from './popup-department.component';

describe('PopupDepartmentComponent', () => {
  let component: PopupDepartmentComponent;
  let fixture: ComponentFixture<PopupDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
