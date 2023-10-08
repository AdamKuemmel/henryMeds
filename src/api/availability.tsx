import localforage from "localforage";
import { matchSorter } from "match-sorter";
//@ts-ignore
import sortBy from "sort-by";
import { useAuth } from "../auth";

export async function getAvailabilities(query?: any) {
  await fakeNetwork(`getAvailabilities:${query}`);
  let availabilities: any = await localforage.getItem("availabilities");
  if (!availabilities) availabilities = [];
  if (query) {
    availabilities = matchSorter(availabilities, query, {
      keys: ["id"],
    });
  }
  return availabilities.sort(sortBy("date", "createdAt"));
}

export async function createAvailability(
  username?: string,
  title?: string,
  startDate?: Date,
  endDate?: Date
) {
  await fakeNetwork();
  let id = username;
  let availability = {
    id,
    title,
    startDate,
    endDate,
    createdAt: Date.now(),
    available: true,
  };

  let availabilities = await getAvailabilities();
  availabilities.unshift(availability);
  await set(availabilities);
  return availability;
}

export async function getAvailability(id: any) {
  await fakeNetwork(`availability:${id}`);
  let availabilities: any = await localforage.getItem("availabilities");
  let availability = availabilities.find(
    (availability: any) => availability.id === id
  );
  return availability ?? null;
}

export async function updateAvailability(id: any, updates: any) {
  await fakeNetwork();
  let availabilities: any = await localforage.getItem("availabilities");
  let availability = availabilities.find(
    (availability: any) => availability.id === id
  );
  if (!availability) throw new Error("No availability found for", id);
  Object.assign(availability, updates);
  await set(availabilities);
  return availability;
}

export async function deleteAvailability(id: any) {
  let availabilities: any = await localforage.getItem("availabilities");
  let index = availabilities.findIndex(
    (availability: any) => availability.id === id
  );
  if (index > -1) {
    availabilities.splice(index, 1);
    await set(availabilities);
    return true;
  }
  return false;
}

function set(availabilities: any) {
  return localforage.setItem("availabilities", availabilities);
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
