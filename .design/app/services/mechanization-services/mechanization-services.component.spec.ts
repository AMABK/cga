import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanizationServicesComponent } from './mechanization-services.component';

describe('MechanizationServicesComponent', () => {
  let component: MechanizationServicesComponent;
  let fixture: ComponentFixture<MechanizationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanizationServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanizationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
