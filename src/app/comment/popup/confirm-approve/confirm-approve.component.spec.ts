import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmApproveComponent } from './confirm-approve.component';

describe('ConfirmApproveComponent', () => {
  let component: ConfirmApproveComponent;
  let fixture: ComponentFixture<ConfirmApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmApproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
