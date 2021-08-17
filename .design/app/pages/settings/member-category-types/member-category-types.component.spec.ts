import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCategoryTypesComponent } from './member-category-types.component';

describe('MemberCategoryTypesComponent', () => {
  let component: MemberCategoryTypesComponent;
  let fixture: ComponentFixture<MemberCategoryTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCategoryTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCategoryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
