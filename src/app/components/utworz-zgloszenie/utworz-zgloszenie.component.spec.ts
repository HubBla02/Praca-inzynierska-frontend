import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtworzZgloszenieComponent } from './utworz-zgloszenie.component';

describe('UtworzZgloszenieComponent', () => {
  let component: UtworzZgloszenieComponent;
  let fixture: ComponentFixture<UtworzZgloszenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtworzZgloszenieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtworzZgloszenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
