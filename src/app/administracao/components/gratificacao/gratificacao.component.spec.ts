import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratificacaoComponent } from './gratificacao.component';

describe('GratificacaoComponent', () => {
  let component: GratificacaoComponent;
  let fixture: ComponentFixture<GratificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
