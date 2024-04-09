import { TestBed } from '@angular/core/testing';

import { TransfereserviceService } from './transfereservice.service';

describe('TransfereserviceService', () => {
  let service: TransfereserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfereserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
