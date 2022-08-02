import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhysicalexaminationdetailtypeComponent } from './popup-physicalexaminationdetailtype.component';

describe('PopupPhysicalexaminationdetailtypeComponent', () => {
  let component: PopupPhysicalexaminationdetailtypeComponent;
  let fixture: ComponentFixture<PopupPhysicalexaminationdetailtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPhysicalexaminationdetailtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhysicalexaminationdetailtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
