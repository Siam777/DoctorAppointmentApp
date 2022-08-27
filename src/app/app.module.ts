import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorAppointmentScheduleComponent } from './doctor-appointment-schedule/doctor-appointment-schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { TimeTransformPipe } from './pipe/timeTransform';

@NgModule({
  declarations: [
    AppComponent,
    DoctorAppointmentScheduleComponent,
    CreateAppointmentComponent,
    AppointmentDetailsComponent,
    TimeTransformPipe
  ],
  entryComponents: [CreateAppointmentComponent, AppointmentDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    FormsModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
