import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationServicesComponent } from './aggregation-services.component';

describe('AggregationServicesComponent', () => {
  let component: AggregationServicesComponent;
  let fixture: ComponentFixture<AggregationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregationServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
