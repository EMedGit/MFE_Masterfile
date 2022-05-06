import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddressComponent } from './popup-address.component';

describe('PopupAddressComponent', () => {
  let component: PopupAddressComponent;
  let fixture: ComponentFixture<PopupAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
