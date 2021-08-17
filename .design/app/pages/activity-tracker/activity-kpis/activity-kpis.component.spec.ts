import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityKpisComponent } from './activity-kpis.component';

describe('ActivityKpisComponent', () => {
  let component: ActivityKpisComponent;
  let fixture: ComponentFixture<ActivityKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityKpisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
