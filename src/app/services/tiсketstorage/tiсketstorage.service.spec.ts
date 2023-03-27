import { TestBed } from '@angular/core/testing';

import {TicketsStorageService} from './tiсketstorage.service';

describe('TiсketstorageService', () => {
  let service: TicketsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
