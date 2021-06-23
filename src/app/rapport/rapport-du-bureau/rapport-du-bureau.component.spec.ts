import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportDuBureauComponent } from './rapport-du-bureau.component';

describe('RapportDuBureauComponent', () => {
  let component: RapportDuBureauComponent;
  let fixture: ComponentFixture<RapportDuBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportDuBureauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportDuBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
