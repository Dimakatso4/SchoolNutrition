import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictVerificationComponent } from './district-verification.component';

describe('DistrictVerificationComponent', () => {
  let component: DistrictVerificationComponent;
  let fixture: ComponentFixture<DistrictVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
