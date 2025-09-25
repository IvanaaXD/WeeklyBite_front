import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyRecipesComponent } from './weekly-recipes.component';

describe('WeeklyRecipesComponent', () => {
  let component: WeeklyRecipesComponent;
  let fixture: ComponentFixture<WeeklyRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
