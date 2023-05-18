import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTableComponentComponent } from './students-table-component.component';

describe('StudentsTableComponentComponent', () => {
  let component: StudentsTableComponentComponent;
  let fixture: ComponentFixture<StudentsTableComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsTableComponentComponent]
    });
    fixture = TestBed.createComponent(StudentsTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
