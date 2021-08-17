import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgripreneurComponent } from './add-agripreneur.component';

describe('AddAgripreneurComponent', () => {
  let component: AddAgripreneurComponent;
  let fixture: ComponentFixture<AddAgripreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAgripreneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgripreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
