import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyIngredientsComponent } from './weekly-ingredients.component';

describe('WeeklyIngredientsComponent', () => {
  let component: WeeklyIngredientsComponent;
  let fixture: ComponentFixture<WeeklyIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
