import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeekDayComponent } from './update-week-day.component';

describe('UpdateWeekDayComponent', () => {
  let component: UpdateWeekDayComponent;
  let fixture: ComponentFixture<UpdateWeekDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateWeekDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWeekDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
