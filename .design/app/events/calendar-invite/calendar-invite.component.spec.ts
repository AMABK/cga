import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInviteComponent } from './calendar-invite.component';

describe('CalendarInviteComponent', () => {
  let component: CalendarInviteComponent;
  let fixture: ComponentFixture<CalendarInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
