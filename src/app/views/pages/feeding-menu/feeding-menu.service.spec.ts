import { TestBed } from '@angular/core/testing';

import { FeedingMenuService } from './feeding-menu.service';

describe('DeliveryScheduleService', () => {
  let service: FeedingMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedingMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
