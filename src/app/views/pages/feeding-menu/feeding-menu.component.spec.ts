import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingMenuComponent } from './feeding-menu.component';

describe('NsnpRegistrationComponent', () => {
  let component: FeedingMenuComponent;
  let fixture: ComponentFixture<FeedingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
