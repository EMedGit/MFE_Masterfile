import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhysicalexaminationdetailComponent } from './popup-physicalexaminationdetail.component';

describe('PopupPhysicalexaminationdetailComponent', () => {
  let component: PopupPhysicalexaminationdetailComponent;
  let fixture: ComponentFixture<PopupPhysicalexaminationdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPhysicalexaminationdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhysicalexaminationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
