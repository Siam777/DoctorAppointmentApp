import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { getTotalDays } from '../function/getTotalDays';
import { sortAppointments } from '../function/sortAppointments';
import { Appointment } from '../interface/Appointment';
import { AppointmentDateWise } from '../model/AppointmentDateWise';
import { Month } from '../model/Month';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-doctor-appointment-schedule',
  templateUrl: './doctor-appointment-schedule.component.html',
  styleUrls: ['./doctor-appointment-schedule.component.scss']
})
export class DoctorAppointmentScheduleComponent implements OnInit {

  months: Month[] = [];

  currentYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;

  totalDaysOfSelectedMonth: number = 0;

  dayNames: string[] = [];
  appoinmentDays: AppointmentDateWise[] = [];

  selectedAppointment!: Appointment;


  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialoig: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.months = this.getAllMonths();

    this.activatedRoute.params.subscribe((param: Params) => {
      let monthNo = param['monthNo'];
      if (monthNo != null) {
        this.selectedMonth = parseInt(monthNo);
        this.getDaynames();
        this.getDaysIncludingAppoinment(monthNo);
      }
    })
  }

  getAllMonths() {
    let months: Month[] = [];
    for (let i = 0; i <= 11; i++) {
      let date = new Date(this.currentYear, i, 26);
      let monthName = date.toLocaleString('en-us', { month: 'long' });
      months.push(new Month(i + 1, monthName));
    }
    return months;
  }

  openAppointmentDialog() {
    let dialogRef = this.dialoig.open(CreateAppointmentComponent, { data: { selectedMonth: this.selectedMonth } });
    dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      let newAppointment = response;
      if (newAppointment.firstName != '') {
        this.localStorageService.addNewAppointment(newAppointment, 'appointments');
        let snackbarRef = this.snackBar.open("Appointment created successfully", '',
          {
            duration: 2000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        this.addNewAppointmentAfterSave(newAppointment);
      }
    })
  }

  addNewAppointmentAfterSave(appointment: Appointment) {
    let apmDate = (new Date(appointment.date));
    let dayOfAppointment = apmDate.getDate();
    if ((apmDate?.getMonth() + 1) === this.selectedMonth && apmDate?.getFullYear() === this.currentYear) {
      let indexNo = this.appoinmentDays.findIndex((obj: AppointmentDateWise) => obj.dayNumber === dayOfAppointment);
      if (indexNo != -1) {
        this.appoinmentDays[indexNo].appointments?.push(appointment);
        this.appoinmentDays[indexNo].appointments = sortAppointments([... this.appoinmentDays[indexNo].appointments]);
      }
    }
  }

  monthChanged(event: MatSelectChange) {
    let monthNo = event.value;
    this.router.navigate([`../${monthNo}`], { relativeTo: this.activatedRoute });
  }

  getDaynames() {
    this.dayNames = [];
    for (let i = 1; i < 8; i++) {
      let dayName = new Date(this.currentYear, this.selectedMonth - 1, i)?.toLocaleDateString('en-us', { weekday: 'short' });
      console.log(dayName);
      if (dayName) {
        this.dayNames.push(dayName);
      }
    }
  }

  getDaysIncludingAppoinment(month: number) {
    this.appoinmentDays = [];
    let totalDays = getTotalDays(this.currentYear, this.selectedMonth);

    for (let dayNo = 1; dayNo <= totalDays; dayNo++) {
      let appoinmentDay = new AppointmentDateWise(dayNo, this.getAppointmentsDayWise(dayNo));
      this.appoinmentDays.push(appoinmentDay);
    }
  }

  getAppointmentsDayWise(day: number): Appointment[] {
    let selectedAppointments: Appointment[] = [];
    let allappointments = this.localStorageService.getAllAppointments('appointments');

    selectedAppointments = allappointments.filter((apment: Appointment) => {
      let apDate = new Date(apment.date);
      let apDay = apDate.getDate();
      let apMonth = apDate.getMonth() + 1;
      let apYear = apDate.getFullYear();
      return (day === apDay && this.selectedMonth === apMonth && this.currentYear === apYear) ? apment : null;
    });

    return selectedAppointments;
  }

  appointmentDetail(appInfo: Appointment) {
    let detailDialogRef = this.dialoig.open(AppointmentDetailsComponent, {
      width: '400px',
      data: appInfo
    });
  }
  
}
