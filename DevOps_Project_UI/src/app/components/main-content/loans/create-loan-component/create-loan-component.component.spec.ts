import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoanComponentComponent } from './create-loan-component.component';

describe('CreateLoanComponentComponent', () => {
  let component: CreateLoanComponentComponent;
  let fixture: ComponentFixture<CreateLoanComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLoanComponentComponent]
    });
    fixture = TestBed.createComponent(CreateLoanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
