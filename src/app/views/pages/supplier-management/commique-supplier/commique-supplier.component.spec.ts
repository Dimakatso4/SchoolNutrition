import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommiqueSupplierComponent } from './commique-supplier.component';

describe('CommiqueSupplierComponent', () => {
  let component: CommiqueSupplierComponent;
  let fixture: ComponentFixture<CommiqueSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommiqueSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommiqueSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
