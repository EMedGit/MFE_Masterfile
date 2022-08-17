import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImmunizationtypeComponent } from './popup-immunizationtype.component';

describe('PopupImmunizationtypeComponent', () => {
  let component: PopupImmunizationtypeComponent;
  let fixture: ComponentFixture<PopupImmunizationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupImmunizationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupImmunizationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
