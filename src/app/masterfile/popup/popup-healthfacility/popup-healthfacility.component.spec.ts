import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHealthfacilityComponent } from './popup-healthfacility.component';

describe('PopupHealthfacilityComponent', () => {
  let component: PopupHealthfacilityComponent;
  let fixture: ComponentFixture<PopupHealthfacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupHealthfacilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupHealthfacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
