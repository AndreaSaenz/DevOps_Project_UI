import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFineComponentComponent } from './create-fine-component.component';

describe('CreateFineComponentComponent', () => {
  let component: CreateFineComponentComponent;
  let fixture: ComponentFixture<CreateFineComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFineComponentComponent]
    });
    fixture = TestBed.createComponent(CreateFineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
