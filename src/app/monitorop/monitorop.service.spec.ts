import { TestBed } from '@angular/core/testing';

import { MonitoropService } from './monitorop.service';

describe('MonitoropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoropService = TestBed.get(MonitoropService);
    expect(service).toBeTruthy();
  });
});
