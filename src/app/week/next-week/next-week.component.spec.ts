import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextWeekComponent } from './next-week.component';

describe('NextWeekComponent', () => {
  let component: NextWeekComponent;
  let fixture: ComponentFixture<NextWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
