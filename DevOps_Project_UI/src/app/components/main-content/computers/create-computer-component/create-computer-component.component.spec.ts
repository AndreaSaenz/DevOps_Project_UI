import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComputerComponentComponent } from './create-computer-component.component';

describe('CreateComputerComponentComponent', () => {
  let component: CreateComputerComponentComponent;
  let fixture: ComponentFixture<CreateComputerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComputerComponentComponent]
    });
    fixture = TestBed.createComponent(CreateComputerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
