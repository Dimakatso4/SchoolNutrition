import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsnpRegistrationComponent } from './nsnp-registration.component';

describe('NsnpRegistrationComponent', () => {
  let component: NsnpRegistrationComponent;
  let fixture: ComponentFixture<NsnpRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsnpRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsnpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
