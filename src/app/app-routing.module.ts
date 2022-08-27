import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAppointmentScheduleComponent } from './doctor-appointment-schedule/doctor-appointment-schedule.component';

let currentMonth = new Date().getMonth() + 1;

const routes: Routes = [
  { path: 'month/:monthNo', component: DoctorAppointmentScheduleComponent },
  { path: '', redirectTo:`month/${currentMonth}`, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
