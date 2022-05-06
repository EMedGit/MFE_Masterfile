import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRvsComponent } from './popup-rvs.component';

describe('PopupRvsComponent', () => {
  let component: PopupRvsComponent;
  let fixture: ComponentFixture<PopupRvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
