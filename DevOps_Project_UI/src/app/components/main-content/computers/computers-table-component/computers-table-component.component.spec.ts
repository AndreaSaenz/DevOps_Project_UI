import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersTableComponentComponent } from './computers-table-component.component';

describe('ComputersTableComponentComponent', () => {
  let component: ComputersTableComponentComponent;
  let fixture: ComponentFixture<ComputersTableComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputersTableComponentComponent]
    });
    fixture = TestBed.createComponent(ComputersTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
