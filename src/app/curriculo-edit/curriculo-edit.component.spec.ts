import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoEditComponent } from './curriculo-edit.component';

describe('CurriculoEditComponent', () => {
  let component: CurriculoEditComponent;
  let fixture: ComponentFixture<CurriculoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
