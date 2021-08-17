import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCategoriesComponent } from './member-categories.component';

describe('MemberCategoriesComponent', () => {
  let component: MemberCategoriesComponent;
  let fixture: ComponentFixture<MemberCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
