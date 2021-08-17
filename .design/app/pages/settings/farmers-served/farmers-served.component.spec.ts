import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersServedComponent } from './farmers-served.component';

describe('FarmersServedComponent', () => {
  let component: FarmersServedComponent;
  let fixture: ComponentFixture<FarmersServedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersServedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersServedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
