import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasicDetailComponent } from './add-basic-detail.component';

describe('AddBasicDetailComponent', () => {
  let component: AddBasicDetailComponent;
  let fixture: ComponentFixture<AddBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBasicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
