import { TestBed } from '@angular/core/testing';

import { SdDeliveryScheduleService } from './sd-delivery-schedule.service';

describe('SdDeliveryScheduleService', () => {
  let service: SdDeliveryScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdDeliveryScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
