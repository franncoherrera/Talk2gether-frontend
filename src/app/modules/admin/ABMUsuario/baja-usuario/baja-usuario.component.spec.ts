import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaUsuarioComponent } from './baja-usuario.component';

describe('BajaUsuarioComponent', () => {
  let component: BajaUsuarioComponent;
  let fixture: ComponentFixture<BajaUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BajaUsuarioComponent]
    });
    fixture = TestBed.createComponent(BajaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
