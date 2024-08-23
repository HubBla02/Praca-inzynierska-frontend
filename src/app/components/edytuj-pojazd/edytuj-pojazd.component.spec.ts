import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdytujPojazdComponent } from './edytuj-pojazd.component';

describe('EdytujPojazdComponent', () => {
  let component: EdytujPojazdComponent;
  let fixture: ComponentFixture<EdytujPojazdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdytujPojazdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdytujPojazdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
