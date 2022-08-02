import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPhysicalexaminationtypeComponent } from './popup-physicalexaminationtype.component';

describe('PopupPhysicalexaminationtypeComponent', () => {
  let component: PopupPhysicalexaminationtypeComponent;
  let fixture: ComponentFixture<PopupPhysicalexaminationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPhysicalexaminationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPhysicalexaminationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
