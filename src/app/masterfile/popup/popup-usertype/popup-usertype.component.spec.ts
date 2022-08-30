import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUsertypeComponent } from './popup-usertype.component';

describe('PopupUsertypeComponent', () => {
  let component: PopupUsertypeComponent;
  let fixture: ComponentFixture<PopupUsertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUsertypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUsertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
