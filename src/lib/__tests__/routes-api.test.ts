import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { computeRoute } from "../routes-api";

const MOCK_RESPONSE = {
  routes: [
    {
      polyline: { encodedPolyline: "_p~iF~ps|U_ulLnnqC" },
      distanceMeters: 12345,
      duration: "600s",
    },
  ],
};

describe("computeRoute", () => {
  beforeEach(() => {
    vi.stubEnv("GOOGLE_MAPS_API_KEY", "test-api-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("API キー未設定時にエラーをスローする", async () => {
    vi.stubEnv("GOOGLE_MAPS_API_KEY", "");
    await expect(
      computeRoute({ origin: "東京駅", destination: "新宿駅", vehicleClass: "genki1" })
    ).rejects.toThrow("GOOGLE_MAPS_API_KEY");
  });

  it("正常レスポンスをパースして返す", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(MOCK_RESPONSE),
      })
    );

    const result = await computeRoute({
      origin: "東京駅",
      destination: "新宿駅",
      vehicleClass: "normal",
    });

    expect(result.encodedPolyline).toBe("_p~iF~ps|U_ulLnnqC");
    expect(result.distanceMeters).toBe(12345);
    expect(result.durationSeconds).toBe(600);
  });

  it("genki1: avoidHighways / avoidTolls / avoidFerries が true", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_RESPONSE),
    });
    vi.stubGlobal("fetch", mockFetch);

    await computeRoute({ origin: "A", destination: "B", vehicleClass: "genki1" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.routeModifiers.avoidHighways).toBe(true);
    expect(body.routeModifiers.avoidTolls).toBe(true);
    expect(body.routeModifiers.avoidFerries).toBe(true);
  });

  it("genki2: avoidHighways / avoidTolls が true、avoidFerries は false", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_RESPONSE),
    });
    vi.stubGlobal("fetch", mockFetch);

    await computeRoute({ origin: "A", destination: "B", vehicleClass: "genki2" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.routeModifiers.avoidHighways).toBe(true);
    expect(body.routeModifiers.avoidTolls).toBe(true);
    expect(body.routeModifiers.avoidFerries).toBe(false);
  });

  it("normal: 全 avoid が false", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(MOCK_RESPONSE),
    });
    vi.stubGlobal("fetch", mockFetch);

    await computeRoute({ origin: "A", destination: "B", vehicleClass: "normal" });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.routeModifiers.avoidHighways).toBe(false);
    expect(body.routeModifiers.avoidTolls).toBe(false);
    expect(body.routeModifiers.avoidFerries).toBe(false);
  });

  it("APIエラー時にエラーをスローする", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: () => Promise.resolve("Forbidden"),
      })
    );

    await expect(
      computeRoute({ origin: "A", destination: "B", vehicleClass: "normal" })
    ).rejects.toThrow("403");
  });

  it("ルートなし時にエラーをスローする", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ routes: [] }),
      })
    );

    await expect(
      computeRoute({ origin: "A", destination: "B", vehicleClass: "normal" })
    ).rejects.toThrow("ルートが見つかりませんでした");
  });
});
