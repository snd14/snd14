import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherPaiementComponent } from './rechercher-paiement.component';

describe('RechercherPaiementComponent', () => {
  let component: RechercherPaiementComponent;
  let fixture: ComponentFixture<RechercherPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercherPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercherPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
