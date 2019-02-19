import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposteAutoritaComponent } from './proposte-autorita.component';

describe('ProposteAutoritaComponent', () => {
  let component: ProposteAutoritaComponent;
  let fixture: ComponentFixture<ProposteAutoritaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposteAutoritaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposteAutoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
