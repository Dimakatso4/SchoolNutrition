import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HONsnpRegistrationComponent } from './ho-nsnp-registration.component';

describe('NsnpRegistrationComponent', () => {
  let component: HONsnpRegistrationComponent;
  let fixture: ComponentFixture<HONsnpRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HONsnpRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HONsnpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
