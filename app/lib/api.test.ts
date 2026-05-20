import { describe, it, expect, vi, beforeEach } from "vitest";
import { getHouses } from "./api";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getHouses", () => {
  it("returns houses on successful response", async () => {
    const mockHouses = [{ id: 1, address: "123 Main St" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ houses: mockHouses }),
    });

    const result = await getHouses({ page: 1, perPage: 10 });
    expect(result).toEqual({ houses: mockHouses });
  });

  it("retries on 503 and succeeds", async () => {
    const mockHouses = [{ id: 1, address: "123 Main St" }];
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ houses: mockHouses }),
      });

    const result = await getHouses({ page: 1, perPage: 10 });
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ houses: mockHouses });
  });

  it("throws error on non-503 failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getHouses({ page: 1, perPage: 10 })).rejects.toThrow("404");
  });
});
