import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypesComponent } from './member-types.component';

describe('MemberTypesComponent', () => {
  let component: MemberTypesComponent;
  let fixture: ComponentFixture<MemberTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
