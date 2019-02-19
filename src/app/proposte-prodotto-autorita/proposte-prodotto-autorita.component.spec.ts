import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposteProdottoAutoritaComponent } from './proposte-prodotto-autorita.component';

describe('ProposteProdottoAutoritaComponent', () => {
  let component: ProposteProdottoAutoritaComponent;
  let fixture: ComponentFixture<ProposteProdottoAutoritaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposteProdottoAutoritaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposteProdottoAutoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
