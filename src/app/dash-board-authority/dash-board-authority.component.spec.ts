import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardAuthorityComponent } from './dash-board-authority.component';

describe('DashBoardAuthorityComponent', () => {
  let component: DashBoardAuthorityComponent;
  let fixture: ComponentFixture<DashBoardAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
