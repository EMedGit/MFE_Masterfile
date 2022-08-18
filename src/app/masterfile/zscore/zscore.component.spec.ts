import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZscoreComponent } from './zscore.component';

describe('ZscoreComponent', () => {
  let component: ZscoreComponent;
  let fixture: ComponentFixture<ZscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
