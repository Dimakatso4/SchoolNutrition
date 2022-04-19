import { TestBed } from '@angular/core/testing';

import { MenuCalculatorService } from './menu-calculator.service';

describe('DeliveryScheduleService', () => {
  let service: MenuCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
