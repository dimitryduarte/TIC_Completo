import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesComponent } from './oportunidades.component';

describe('OportunidadesComponent', () => {
  let component: OportunidadesComponent;
  let fixture: ComponentFixture<OportunidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
