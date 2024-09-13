import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaWypozyczenComponent } from './lista-wypozyczen.component';

describe('ListaWypozyczenComponent', () => {
  let component: ListaWypozyczenComponent;
  let fixture: ComponentFixture<ListaWypozyczenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaWypozyczenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaWypozyczenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
