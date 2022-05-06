import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProvinceComponent } from './popup-province.component';

describe('PopupProvinceComponent', () => {
  let component: PopupProvinceComponent;
  let fixture: ComponentFixture<PopupProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
