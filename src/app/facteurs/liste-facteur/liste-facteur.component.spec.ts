import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFacteurComponent } from './liste-facteur.component';

describe('ListeFacteurComponent', () => {
  let component: ListeFacteurComponent;
  let fixture: ComponentFixture<ListeFacteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFacteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
