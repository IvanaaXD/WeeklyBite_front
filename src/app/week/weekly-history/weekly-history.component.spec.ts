import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyHistoryComponent } from './weekly-history.component';

describe('WeeklyHistoryComponent', () => {
  let component: WeeklyHistoryComponent;
  let fixture: ComponentFixture<WeeklyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
