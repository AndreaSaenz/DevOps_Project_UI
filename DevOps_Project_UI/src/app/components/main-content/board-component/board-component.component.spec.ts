import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponentComponent } from './board-component.component';

describe('BoardComponentComponent', () => {
  let component: BoardComponentComponent;
  let fixture: ComponentFixture<BoardComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponentComponent]
    });
    fixture = TestBed.createComponent(BoardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
