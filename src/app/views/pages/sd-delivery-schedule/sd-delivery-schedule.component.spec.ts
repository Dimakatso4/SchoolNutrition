import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdDeliveryScheduleComponent } from "./sd-delivery-schedule.component";

describe('NsnpRegistrationComponent', () => {
  let component: SdDeliveryScheduleComponent;
  let fixture: ComponentFixture<SdDeliveryScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdDeliveryScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdDeliveryScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
