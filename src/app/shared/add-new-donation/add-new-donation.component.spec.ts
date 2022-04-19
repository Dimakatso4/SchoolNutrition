import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDonationComponent } from './add-new-donation.component';

describe('AddNewDonationComponent', () => {
  let component: AddNewDonationComponent;
  let fixture: ComponentFixture<AddNewDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
