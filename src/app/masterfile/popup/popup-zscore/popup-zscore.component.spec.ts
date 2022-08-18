import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupZscoreComponent } from './popup-zscore.component';

describe('PopupZscoreComponent', () => {
  let component: PopupZscoreComponent;
  let fixture: ComponentFixture<PopupZscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupZscoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupZscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
