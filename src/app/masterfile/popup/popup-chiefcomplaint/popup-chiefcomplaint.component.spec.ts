import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChiefcomplaintComponent } from './popup-chiefcomplaint.component';

describe('PopupChiefcomplaintComponent', () => {
  let component: PopupChiefcomplaintComponent;
  let fixture: ComponentFixture<PopupChiefcomplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChiefcomplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChiefcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
