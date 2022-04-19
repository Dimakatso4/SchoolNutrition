import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNsnpRegistrationComponent } from './send-nsnp-registration.component';

describe('SendNsnpRegistrationComponent', () => {
  let component: SendNsnpRegistrationComponent;
  let fixture: ComponentFixture<SendNsnpRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNsnpRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNsnpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
