import { TestBed } from '@angular/core/testing';

import { Api.InterfaceService } from './api.interface.service';

describe('Api.InterfaceService', () => {
  let service: Api.InterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api.InterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
