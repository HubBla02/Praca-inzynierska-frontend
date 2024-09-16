import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkomatComponent } from './alkomat.component';

describe('AlkomatComponent', () => {
  let component: AlkomatComponent;
  let fixture: ComponentFixture<AlkomatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlkomatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlkomatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
