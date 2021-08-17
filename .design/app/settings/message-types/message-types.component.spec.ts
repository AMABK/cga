import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTypesComponent } from './message-types.component';

describe('MessageTypesComponent', () => {
  let component: MessageTypesComponent;
  let fixture: ComponentFixture<MessageTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
