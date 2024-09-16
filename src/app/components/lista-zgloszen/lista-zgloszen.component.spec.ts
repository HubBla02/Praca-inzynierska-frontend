import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaZgloszenComponent } from './lista-zgloszen.component';

describe('ListaZgloszenComponent', () => {
  let component: ListaZgloszenComponent;
  let fixture: ComponentFixture<ListaZgloszenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaZgloszenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaZgloszenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
