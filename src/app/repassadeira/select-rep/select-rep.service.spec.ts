import { TestBed } from '@angular/core/testing';

import { SelectRepService } from './select-rep.service';

describe('SelectRepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectRepService = TestBed.get(SelectRepService);
    expect(service).toBeTruthy();
  });
});
