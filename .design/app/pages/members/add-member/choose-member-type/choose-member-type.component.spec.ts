import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMemberTypeComponent } from './choose-member-type.component';

describe('ChooseMemberTypeComponent', () => {
  let component: ChooseMemberTypeComponent;
  let fixture: ComponentFixture<ChooseMemberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMemberTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
