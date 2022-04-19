import { TestBed } from '@angular/core/testing';

import { SchoolMenuService } from './school-menu.service';

describe('SchoolMenuService', () => {
  let service: SchoolMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
