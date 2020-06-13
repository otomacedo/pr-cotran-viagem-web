import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrenciarFuncionarioComponent } from './genrenciar-funcionario.component';

describe('GenrenciarFuncionarioComponent', () => {
  let component: GenrenciarFuncionarioComponent;
  let fixture: ComponentFixture<GenrenciarFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrenciarFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrenciarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
