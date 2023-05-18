import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentComponentComponent } from './create-student-component.component';

describe('CreateStudentComponentComponent', () => {
  let component: CreateStudentComponentComponent;
  let fixture: ComponentFixture<CreateStudentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentComponentComponent]
    });
    fixture = TestBed.createComponent(CreateStudentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
