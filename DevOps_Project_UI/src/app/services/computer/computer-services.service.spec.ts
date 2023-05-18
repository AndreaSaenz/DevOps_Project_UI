import { TestBed } from '@angular/core/testing';

import { ComputerServicesService } from './computer-services.service';

describe('ComputerServicesService', () => {
  let service: ComputerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
