import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {

  appointmnetForm: FormGroup;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  currentDay = new Date().getDate();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
  maxDate = new Date(this.currentYear, 11, 31);

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.appointmnetForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['',Validators.min(0)],
      gender: [''],
      date: ['', [Validators.required]],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {   
  }

  onSubmit(): void {
    this.dialogRef.close(this.appointmnetForm?.value);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get firstName() {
    return this.appointmnetForm?.get('firstName');
  }

  get lastName() {
    return this.appointmnetForm?.get('lastName');
  }

  get email() {
    return this.appointmnetForm?.get('email');
  }

  get age() {
    return this.appointmnetForm?.get('age');
  }

  get gender() {
    return this.appointmnetForm?.get('gender');
  }

  get date() {
    return this.appointmnetForm?.get('date');
  }

  get time() {
    return this.appointmnetForm?.get('time');
  }

}
