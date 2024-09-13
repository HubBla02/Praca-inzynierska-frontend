import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajZdjecieComponent } from './dodaj-zdjecie.component';

describe('DodajZdjecieComponent', () => {
  let component: DodajZdjecieComponent;
  let fixture: ComponentFixture<DodajZdjecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajZdjecieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodajZdjecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
