import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPDeliveryComponent } from './non-p-delivery.component';

describe('NonPDeliveryComponent', () => {
  let component: NonPDeliveryComponent;
  let fixture: ComponentFixture<NonPDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
