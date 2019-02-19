import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruppoproposteProdottoDetailComponent } from './gruppoproposte-prodotto-detail.component';

describe('GruppoproposteProdottoDetailComponent', () => {
  let component: GruppoproposteProdottoDetailComponent;
  let fixture: ComponentFixture<GruppoproposteProdottoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruppoproposteProdottoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruppoproposteProdottoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
