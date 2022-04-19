import { TestBed } from '@angular/core/testing';

import { MonthlyDelieveriesSchedulesService } from './monthly-delieveries-schedules.service';

describe('MonthlyDelieveriesSchedulesService', () => {
  let service: MonthlyDelieveriesSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyDelieveriesSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
