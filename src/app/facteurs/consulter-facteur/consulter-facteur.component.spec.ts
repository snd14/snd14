import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFacteurComponent } from './consulter-facteur.component';

describe('ConsulterFacteurComponent', () => {
  let component: ConsulterFacteurComponent;
  let fixture: ComponentFixture<ConsulterFacteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterFacteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFacteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
