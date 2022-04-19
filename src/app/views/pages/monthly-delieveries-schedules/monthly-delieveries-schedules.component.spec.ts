import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDelieveriesSchedulesComponent } from './monthly-delieveries-schedules.component';

describe('MonthlyDelieveriesSchedulesComponent', () => {
  let component: MonthlyDelieveriesSchedulesComponent;
  let fixture: ComponentFixture<MonthlyDelieveriesSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyDelieveriesSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDelieveriesSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
