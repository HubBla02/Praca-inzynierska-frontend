import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WypozyczenieComponent } from './wypozyczenie.component';

describe('WypozyczenieComponent', () => {
  let component: WypozyczenieComponent;
  let fixture: ComponentFixture<WypozyczenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WypozyczenieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WypozyczenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
