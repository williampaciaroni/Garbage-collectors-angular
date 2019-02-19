import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaProdottoComponent } from './proposta-prodotto.component';

describe('PropostaProdottoComponent', () => {
  let component: PropostaProdottoComponent;
  let fixture: ComponentFixture<PropostaProdottoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaProdottoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
