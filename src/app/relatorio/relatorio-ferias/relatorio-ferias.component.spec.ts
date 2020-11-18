import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFeriasComponent } from './relatorio-ferias.component';

describe('RelatorioFeriasComponent', () => {
  let component: RelatorioFeriasComponent;
  let fixture: ComponentFixture<RelatorioFeriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFeriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
