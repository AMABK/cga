import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCategoriesComponent } from './space-categories.component';

describe('SpaceCategoriesComponent', () => {
  let component: SpaceCategoriesComponent;
  let fixture: ComponentFixture<SpaceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
