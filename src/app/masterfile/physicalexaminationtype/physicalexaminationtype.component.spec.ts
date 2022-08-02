import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalexaminationtypeComponent } from './physicalexaminationtype.component';

describe('PhysicalexaminationtypeComponent', () => {
  let component: PhysicalexaminationtypeComponent;
  let fixture: ComponentFixture<PhysicalexaminationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalexaminationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalexaminationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
