import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeactivationComponent } from './confirm-deactivation.component';

describe('ConfirmDeactivationComponent', () => {
  let component: ConfirmDeactivationComponent;
  let fixture: ComponentFixture<ConfirmDeactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeactivationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
