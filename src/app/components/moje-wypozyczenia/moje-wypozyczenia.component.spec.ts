import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeWypozyczeniaComponent } from './moje-wypozyczenia.component';

describe('MojeWypozyczeniaComponent', () => {
  let component: MojeWypozyczeniaComponent;
  let fixture: ComponentFixture<MojeWypozyczeniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MojeWypozyczeniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MojeWypozyczeniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
