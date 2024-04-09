import { TestBed } from '@angular/core/testing';

import { AutehentificationService } from './autehentification.service';

describe('AutehentificationService', () => {
  let service: AutehentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutehentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
