import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherDetailComponent } from './add-other-detail.component';

describe('AddOtherDetailComponent', () => {
  let component: AddOtherDetailComponent;
  let fixture: ComponentFixture<AddOtherDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
