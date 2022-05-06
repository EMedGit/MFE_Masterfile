import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvsComponent } from './rvs.component';

describe('RvsComponent', () => {
  let component: RvsComponent;
  let fixture: ComponentFixture<RvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
