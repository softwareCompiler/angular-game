import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleGameComponent } from './rectangle-game.component';

describe('RectangleGameComponent', () => {
  let component: RectangleGameComponent;
  let fixture: ComponentFixture<RectangleGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectangleGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
