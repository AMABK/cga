import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgripreneurComponent } from './agripreneur.component';

describe('AgripreneurComponent', () => {
  let component: AgripreneurComponent;
  let fixture: ComponentFixture<AgripreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgripreneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgripreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
