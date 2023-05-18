import { TestBed } from '@angular/core/testing';

import { FineServicesService } from './fine-services.service';

describe('FineServicesService', () => {
  let service: FineServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FineServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
