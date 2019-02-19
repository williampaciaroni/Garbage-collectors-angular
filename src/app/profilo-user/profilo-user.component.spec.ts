import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUserComponent } from './profilo-user.component';

describe('ProfiloUserComponent', () => {
  let component: ProfiloUserComponent;
  let fixture: ComponentFixture<ProfiloUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
