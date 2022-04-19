import { TestBed } from '@angular/core/testing';

import { SchoolDeliveryScheduleService } from './school-delivery-schedule.service';

describe('SdDeliveryScheduleService', () => {
  let service: SchoolDeliveryScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolDeliveryScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
