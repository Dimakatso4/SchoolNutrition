import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPDelComponent } from './non-pdel.component';

describe('NonPDelComponent', () => {
  let component: NonPDelComponent;
  let fixture: ComponentFixture<NonPDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPDelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
