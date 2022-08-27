import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../interface/Appointment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {

  selectedAppointment!: Appointment;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) { }

  ngOnInit(): void {
    this.selectedAppointment = this.data;
  }

}
