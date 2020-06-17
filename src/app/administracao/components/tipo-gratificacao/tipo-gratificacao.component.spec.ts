import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGratificacaoComponent } from './tipo-gratificacao.component';

describe('TipoGratificacaoComponent', () => {
  let component: TipoGratificacaoComponent;
  let fixture: ComponentFixture<TipoGratificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGratificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGratificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
