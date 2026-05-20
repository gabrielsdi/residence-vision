import { HousesResponse } from "../types";
import { SERVICE_UNAVAILABLE_STATUS, ERROR_MESSAGES } from "../const/error";

const BASE_URL = process.env.NEXT_PUBLIC_HOMEVISION_API_URL;
const TIMEOUT_MS = 5000;

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

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getHouses({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}): Promise<HousesResponse> {
  return fetchWithRetry(async () => {
    if (!BASE_URL) {
      throw new Error(
        "API URL is missing. Set NEXT_PUBLIC_HOMEVISION_API_URL environment variable.",
      );
    }

    const url = `${BASE_URL}?page=${page}&per_page=${perPage}`;
    const res = await fetchWithTimeout(url);

    if (!res.ok) {
      if (res.status === SERVICE_UNAVAILABLE_STATUS) {
        throw new Error(`${ERROR_MESSAGES.SERVICE_UNAVAILABLE} ${res.status}`);
      }
      throw new Error(`${ERROR_MESSAGES.GENERIC_ERROR} ${res.status}`);
    }

    return res.json();
  });
}
