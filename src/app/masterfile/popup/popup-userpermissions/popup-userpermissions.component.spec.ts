import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUserpermissionsComponent } from './popup-userpermissions.component';

describe('PopupUserpermissionsComponent', () => {
  let component: PopupUserpermissionsComponent;
  let fixture: ComponentFixture<PopupUserpermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUserpermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUserpermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
