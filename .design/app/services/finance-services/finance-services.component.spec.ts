import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceServicesComponent } from './finance-services.component';

describe('FinanceServicesComponent', () => {
  let component: FinanceServicesComponent;
  let fixture: ComponentFixture<FinanceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
