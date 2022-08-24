import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhysicalexaminationsketchComponent } from './popup-physicalexaminationsketch.component';

describe('PopupPhysicalexaminationsketchComponent', () => {
  let component: PopupPhysicalexaminationsketchComponent;
  let fixture: ComponentFixture<PopupPhysicalexaminationsketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPhysicalexaminationsketchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhysicalexaminationsketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
