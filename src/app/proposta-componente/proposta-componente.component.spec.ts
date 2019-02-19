import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaComponenteComponent } from './proposta-componente.component';

describe('PropostaComponenteComponent', () => {
  let component: PropostaComponenteComponent;
  let fixture: ComponentFixture<PropostaComponenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaComponenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
