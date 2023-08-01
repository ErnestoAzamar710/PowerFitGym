import { TestBed } from '@angular/core/testing';

import { DbmongoService } from './dbmongo.service';

describe('DbmongoService', () => {
  let service: DbmongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbmongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
