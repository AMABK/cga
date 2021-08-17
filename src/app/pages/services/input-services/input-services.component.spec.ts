import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputServicesComponent } from './input-services.component';

describe('InputServicesComponent', () => {
  let component: InputServicesComponent;
  let fixture: ComponentFixture<InputServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
