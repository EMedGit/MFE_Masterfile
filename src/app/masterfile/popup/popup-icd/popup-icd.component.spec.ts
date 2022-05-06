import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupIcdComponent } from './popup-icd.component';

describe('PopupIcdComponent', () => {
  let component: PopupIcdComponent;
  let fixture: ComponentFixture<PopupIcdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupIcdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
