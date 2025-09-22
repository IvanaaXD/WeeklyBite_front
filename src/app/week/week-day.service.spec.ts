import { TestBed } from '@angular/core/testing';

import { WeekDayService } from './week-day.service';

describe('WeekDayService', () => {
  let service: WeekDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
