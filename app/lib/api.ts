import { HousesResponse } from "../types";
import { SERVICE_UNAVAILABLE_STATUS, ERROR_MESSAGES } from "../const/error";

const BASE_URL = process.env.NEXT_PUBLIC_HOMEVISION_API_URL;

// This function helps with the flaky API case
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 7,
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e: unknown) {
      const isFlakyError = (e as Error).message?.includes(
        `${SERVICE_UNAVAILABLE_STATUS}`,
      );
      if (!isFlakyError || attempt === maxRetries - 1) throw e;
    }
  }
  throw new Error(ERROR_MESSAGES.MAX_RETRIES);
}

export async function getHouses({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<HousesResponse> {
  return fetchWithRetry(async () => {
    const url = `${BASE_URL}?page=${page}&per_page=${perPage}`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === SERVICE_UNAVAILABLE_STATUS) {
        throw new Error(`${ERROR_MESSAGES.SERVICE_UNAVAILABLE} ${res.status}`);
      }
      throw new Error(`${ERROR_MESSAGES.GENERIC_ERROR} ${res.status}`);
    }

    return res.json();
  });
}
