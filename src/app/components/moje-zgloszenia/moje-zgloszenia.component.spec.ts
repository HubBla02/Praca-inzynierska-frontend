import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeZgloszeniaComponent } from './moje-zgloszenia.component';

describe('MojeZgloszeniaComponent', () => {
  let component: MojeZgloszeniaComponent;
  let fixture: ComponentFixture<MojeZgloszeniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MojeZgloszeniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MojeZgloszeniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
