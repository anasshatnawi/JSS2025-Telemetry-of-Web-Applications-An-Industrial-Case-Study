import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvailabilitySchedulerComponent } from './user-availability-scheduler.component';
import { beforeEach, describe } from 'node:test';

describe('UserAvailabilitySchedulerComponent', () => {
  let component: UserAvailabilitySchedulerComponent;
  let fixture: ComponentFixture<UserAvailabilitySchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAvailabilitySchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvailabilitySchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
