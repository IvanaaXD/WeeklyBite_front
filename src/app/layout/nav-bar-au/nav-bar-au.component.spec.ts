import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAuComponent } from './nav-bar-au.component';

describe('NavBarAuComponent', () => {
  let component: NavBarAuComponent;
  let fixture: ComponentFixture<NavBarAuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarAuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
