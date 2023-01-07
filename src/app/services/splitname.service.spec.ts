import { TestBed } from '@angular/core/testing';

import { SplitnameService } from './splitname.service';

describe('SplitnameService', () => {
  let service: SplitnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
