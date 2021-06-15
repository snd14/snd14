import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePaimentComponent } from './liste-paiment.component';

describe('ListePaimentComponent', () => {
  let component: ListePaimentComponent;
  let fixture: ComponentFixture<ListePaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePaimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
