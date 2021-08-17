import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDemoLearningComponent } from './add-demo-learning.component';

describe('AddDemoLearningComponent', () => {
  let component: AddDemoLearningComponent;
  let fixture: ComponentFixture<AddDemoLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDemoLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDemoLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
