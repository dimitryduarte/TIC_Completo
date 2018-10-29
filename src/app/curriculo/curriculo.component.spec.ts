import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoComponent } from './curriculo.component';

describe('CurriculoComponent', () => {
  let component: CurriculoComponent;
  let fixture: ComponentFixture<CurriculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
