import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPojazdComponent } from './dodaj-pojazd.component';

describe('DodajPojazdComponent', () => {
  let component: DodajPojazdComponent;
  let fixture: ComponentFixture<DodajPojazdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajPojazdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodajPojazdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
