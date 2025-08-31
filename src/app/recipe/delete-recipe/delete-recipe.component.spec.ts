import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipeComponent } from './delete-recipe.component';

describe('DeleteServiceComponent', () => {
  let component: DeleteRecipeComponent;
  let fixture: ComponentFixture<DeleteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
