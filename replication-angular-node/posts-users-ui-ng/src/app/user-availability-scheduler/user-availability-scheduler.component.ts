import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-time-form',
  templateUrl: './user-availability-scheduler.component.html',
  styleUrls: ['./user-availability-scheduler.component.css']
})
export class UserAvailabilitySchedulerComponent implements OnInit {

  dateTimeForm: FormGroup
  dateTime: string;
  time: string;
  month: string;
  week: string;
  availabilitySaved = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dateTimeForm = this.formBuilder.group({
      'dateTime': ['', Validators.required],
      'time': ['', Validators.required],
      'month': ['', Validators.required],
      'week': ['', Validators.required],
    });
  }

  onSubmit() {
    this.dateTime = new Date(this.dateTimeForm.get('dateTime').value).toLocaleDateString();
    this.time = this.dateTimeForm.get('time').value;
    this.month = this.dateTimeForm.get('month').value;
    this.week = this.dateTimeForm.get('week').value;
    this.availabilitySaved = true;
  }

  closeDatepicker(datepicker: MatDatepicker<any>) {
    if (datepicker) {
      datepicker["_destroyOverlay"]();
    }
  }
}
