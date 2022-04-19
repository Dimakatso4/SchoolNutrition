import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMenuComponent } from './school-menu.component';

describe('SchoolMenuComponent', () => {
  let component: SchoolMenuComponent;
  let fixture: ComponentFixture<SchoolMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
