import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMemberCategoryComponent } from './choose-member-category.component';

describe('ChooseMemberCategoryComponent', () => {
  let component: ChooseMemberCategoryComponent;
  let fixture: ComponentFixture<ChooseMemberCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMemberCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMemberCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
