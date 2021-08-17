import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgripreneurProfileComponent } from './agripreneur-profile.component';

describe('AgripreneurProfileComponent', () => {
  let component: AgripreneurProfileComponent;
  let fixture: ComponentFixture<AgripreneurProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgripreneurProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgripreneurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
