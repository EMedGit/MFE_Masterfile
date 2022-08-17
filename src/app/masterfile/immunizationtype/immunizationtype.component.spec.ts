import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationtypeComponent } from './immunizationtype.component';

describe('ImmunizationtypeComponent', () => {
  let component: ImmunizationtypeComponent;
  let fixture: ComponentFixture<ImmunizationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
