import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtworzOpinieComponent } from './utworz-opinie.component';

describe('UtworzOpinieComponent', () => {
  let component: UtworzOpinieComponent;
  let fixture: ComponentFixture<UtworzOpinieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtworzOpinieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtworzOpinieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
