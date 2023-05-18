import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansTableComponentComponent } from './loans-table-component.component';

describe('LoansTableComponentComponent', () => {
  let component: LoansTableComponentComponent;
  let fixture: ComponentFixture<LoansTableComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansTableComponentComponent]
    });
    fixture = TestBed.createComponent(LoansTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
