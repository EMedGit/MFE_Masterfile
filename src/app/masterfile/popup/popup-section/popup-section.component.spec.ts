import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSectionComponent } from './popup-section.component';

describe('PopupSectionComponent', () => {
  let component: PopupSectionComponent;
  let fixture: ComponentFixture<PopupSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
