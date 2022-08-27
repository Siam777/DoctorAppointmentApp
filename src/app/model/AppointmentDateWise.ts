import { Appointment } from "../interface/Appointment";

export class AppointmentDateWise {
    dayNumber: number;
    appointments: Appointment[];
    constructor(day: number, appointments: Appointment[]) {
        this.dayNumber = day;
        this.appointments = appointments;
    }
}