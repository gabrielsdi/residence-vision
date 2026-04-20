import { HousesResponse } from "../types";

const BASE_URL = 'https://staging.homevision.co/api_project/houses?page=1&per_page=10';

export async function getHouses(): Promise<HousesResponse> {
  const res = await fetch(BASE_URL);

  console.log('Response status:', res);

  if (!res.ok) {
    if (res.status === 503) {
        throw new Error(`Service Unavailable: ${res.status}`);
    }
    throw new Error(`Error on get houses: ${res.status}`);
  }

  return res.json();
}