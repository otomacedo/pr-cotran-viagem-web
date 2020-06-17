import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduacaoComponent } from './graduacao.component';

describe('GraduacaoComponent', () => {
  let component: GraduacaoComponent;
  let fixture: ComponentFixture<GraduacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
