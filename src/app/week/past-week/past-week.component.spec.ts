import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeekComponent } from './past-week.component';

describe('PastWeekComponent', () => {
  let component: PastWeekComponent;
  let fixture: ComponentFixture<PastWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
