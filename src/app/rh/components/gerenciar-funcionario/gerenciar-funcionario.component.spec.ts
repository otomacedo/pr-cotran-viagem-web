import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFuncionarioComponent } from './gerenciar-funcionario.component';

describe('GerenciarFuncionarioComponent', () => {
  let component: GerenciarFuncionarioComponent;
  let fixture: ComponentFixture<GerenciarFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
