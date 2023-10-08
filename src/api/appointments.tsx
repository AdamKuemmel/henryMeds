import localforage from "localforage";
import { matchSorter } from "match-sorter";
//@ts-ignore
import sortBy from "sort-by";

export async function getAppointments(query?: any) {
  await fakeNetwork(`getAppointments:${query}`);
  let appointments: any = await localforage.getItem("appointments");
  if (!appointments) appointments = [];
  if (query) {
    appointments = matchSorter(appointments, query, {
      keys: ["id"],
    });
  }
  return appointments.sort(sortBy("date", "createdAt"));
}

export async function createAppointment(
  id?: string,
  reason?: string,
  startDateTime?: Date,

  scheduleID?: string
) {
  await fakeNetwork();

  let appointment = { id, reason, startDateTime, scheduleID };

  let appointments = await getAppointments();
  appointments.unshift(appointment);
  await set(appointments);
  return appointment;
}

export async function getAppointment(id: any) {
  await fakeNetwork(`appointment:${id}`);
  let appointments: any = await localforage.getItem("appointments");
  let appointment = appointments.find(
    (appointment: any) => appointment.id === id
  );
  return appointment ?? null;
}

export async function updateAppointment(id: any, updates: any) {
  await fakeNetwork();
  let appointments: any = await localforage.getItem("appointments");
  let appointment = appointments.find(
    (appointment: any) => appointment.id === id
  );
  if (!appointment) throw new Error("No appointment found for", id);
  Object.assign(appointment, updates);
  await set(appointments);
  return appointment;
}

export async function deleteAppointment(id: any) {
  let appointments: any = await localforage.getItem("appointments");
  let index = appointments.findIndex(
    (appointment: any) => appointment.id === id
  );
  if (index > -1) {
    appointments.splice(index, 1);
    await set(appointments);
    return true;
  }
  return false;
}

function set(appointments: any) {
  return localforage.setItem("appointments", appointments);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key?: any) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
