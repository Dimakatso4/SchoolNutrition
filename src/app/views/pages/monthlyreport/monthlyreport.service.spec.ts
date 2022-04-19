import { TestBed } from '@angular/core/testing';

import { MonthlyreportService } from './monthlyreport.service';

describe('MonthlyreportService', () => {
  let service: MonthlyreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
