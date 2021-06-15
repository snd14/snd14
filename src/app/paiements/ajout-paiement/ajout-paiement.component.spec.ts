import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPaiementComponent } from './ajout-paiement.component';

describe('AjoutPaiementComponent', () => {
  let component: AjoutPaiementComponent;
  let fixture: ComponentFixture<AjoutPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
