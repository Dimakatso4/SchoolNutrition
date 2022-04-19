import { TestBed } from '@angular/core/testing';

import { DeliveryScheduleQueriesService } from './school-delivery-schedule-queries.service';

describe('SdDeliveryScheduleService', () => {
  let service: DeliveryScheduleQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryScheduleQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
