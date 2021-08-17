import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateManagersComponent } from './associate-managers.component';

describe('AssociateManagersComponent', () => {
  let component: AssociateManagersComponent;
  let fixture: ComponentFixture<AssociateManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
