import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMechanizationComponent } from './add-mechanization.component';

describe('AddMechanizationComponent', () => {
  let component: AddMechanizationComponent;
  let fixture: ComponentFixture<AddMechanizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMechanizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMechanizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
