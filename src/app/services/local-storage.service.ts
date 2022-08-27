import { Injectable } from '@angular/core';
import { sortAppointments } from '../function/sortAppointments';
import { Appointment } from '../interface/Appointment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addNewAppointment(data: Appointment, storageKey: string) {
    let appointments: Appointment[] = [];
    let savedAppointments = localStorage.getItem(storageKey);
    if (savedAppointments !== null && savedAppointments?.length > 0) {
      appointments = JSON.parse(savedAppointments);
      appointments = [data, ...appointments]
    }
    else {
      appointments = [data];
    }
    localStorage.setItem(storageKey, JSON.stringify(appointments));
  }

  getAllAppointments(storageKey: string): Appointment[] {
    let appointments: Appointment[] = [];
    let savedAppointments = localStorage.getItem(storageKey);
    if (savedAppointments !== null) {
      appointments = JSON.parse(savedAppointments);
    }

    appointments = sortAppointments([...appointments])
    return appointments;
    // return appointments.sort((a, b) => {
    //   let atimeReplaced = a.time?.replace(':', '');
    //   let btimeReplaced = b.time?.replace(':', '');
    //   let aAsNumber = atimeReplaced ? parseInt(atimeReplaced) : 0;
    //   let bAsNumber = btimeReplaced ? parseInt(btimeReplaced) : 0;
    //   return aAsNumber - bAsNumber;
    // }); 
  }

}
