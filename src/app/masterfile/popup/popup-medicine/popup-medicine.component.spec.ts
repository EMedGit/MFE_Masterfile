import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMedicineComponent } from './popup-medicine.component';

describe('PopupMedicineComponent', () => {
  let component: PopupMedicineComponent;
  let fixture: ComponentFixture<PopupMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
