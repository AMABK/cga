import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLearningComponent } from './demo-learning.component';

describe('DemoLearningComponent', () => {
  let component: DemoLearningComponent;
  let fixture: ComponentFixture<DemoLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
