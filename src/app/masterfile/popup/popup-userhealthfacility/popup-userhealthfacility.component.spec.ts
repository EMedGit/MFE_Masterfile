import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUserhealthfacilityComponent } from './popup-userhealthfacility.component';

describe('PopupUserhealthfacilityComponent', () => {
  let component: PopupUserhealthfacilityComponent;
  let fixture: ComponentFixture<PopupUserhealthfacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUserhealthfacilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUserhealthfacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
