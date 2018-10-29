import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaEditComponent } from './vaga-edit.component';

describe('VagaEditComponent', () => {
  let component: VagaEditComponent;
  let fixture: ComponentFixture<VagaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
