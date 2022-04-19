import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCalculatorComponent } from './menu-calculator.component';

describe('NsnpRegistrationComponent', () => {
  let component: MenuCalculatorComponent;
  let fixture: ComponentFixture<MenuCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
