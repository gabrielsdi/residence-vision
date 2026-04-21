import { HousesResponse } from "../types";

const BASE_URL = 'https://staging.homevision.co/api_project/houses';

// This function helps with the flaky API case
async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (attempt === maxRetries - 1) throw e;
    }
  }
  throw new Error("Max retries reached");
}

export async function getHouses({ page, perPage }: { page: number; perPage: number }): Promise<HousesResponse> {
  return fetchWithRetry(async () => {
    const res = await fetch(`${BASE_URL}?page=${page}&per_page=${perPage}`);

    if (!res.ok) {
      if (res.status === 503) {
        throw new Error(`Service Unavailable: ${res.status}`);
      }
      throw new Error(`Error on get houses: ${res.status}`);
    }

    return res.json();
  });
}