import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOVerificationComponent } from './ho-verification.component';

describe('DistrictVerificationComponent', () => {
  let component: HOVerificationComponent;
  let fixture: ComponentFixture<HOVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HOVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HOVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
