import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesTableComponentComponent } from './fines-table-component.component';

describe('FinesTableComponentComponent', () => {
  let component: FinesTableComponentComponent;
  let fixture: ComponentFixture<FinesTableComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinesTableComponentComponent]
    });
    fixture = TestBed.createComponent(FinesTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
