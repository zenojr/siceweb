import { TestBed } from '@angular/core/testing';

import { RepassadeiraService } from './repassadeira.service';

describe('RepassadeiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepassadeiraService = TestBed.get(RepassadeiraService);
    expect(service).toBeTruthy();
  });
});
