import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayComponent } from './barangay.component';

describe('BarangayComponent', () => {
  let component: BarangayComponent;
  let fixture: ComponentFixture<BarangayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
