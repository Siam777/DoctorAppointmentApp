import { Appointment } from "../interface/Appointment";

export function sortAppointments(appointments: Appointment[]): Appointment[] {
    if (appointments?.length === 0)
        return [];

    return appointments.sort((a, b) => {
        let atimeReplaced = a.time?.replace(':', '');
        let btimeReplaced = b.time?.replace(':', '');
        let aAsNumber = atimeReplaced ? parseInt(atimeReplaced) : 0;
        let bAsNumber = btimeReplaced ? parseInt(btimeReplaced) : 0;
        return aAsNumber - bAsNumber;
    });
}