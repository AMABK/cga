import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAggregationComponent } from './add-aggregation.component';

describe('AddAggregationComponent', () => {
  let component: AddAggregationComponent;
  let fixture: ComponentFixture<AddAggregationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAggregationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAggregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
