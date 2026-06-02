import { describe, it, expect } from "vitest";
import { buildGoogleMapsUrl, VEHICLES } from "../vehicle";

describe("VEHICLES", () => {
  it("genki1 は highways / tolls / ferries を回避する", () => {
    const v = VEHICLES.find((v) => v.id === "genki1")!;
    expect(v.avoid).toContain("highways");
    expect(v.avoid).toContain("tolls");
    expect(v.avoid).toContain("ferries");
  });

  it("genki2 は highways / tolls を回避し ferries は回避しない", () => {
    const v = VEHICLES.find((v) => v.id === "genki2")!;
    expect(v.avoid).toContain("highways");
    expect(v.avoid).toContain("tolls");
    expect(v.avoid).not.toContain("ferries");
  });

  it("normal は回避設定なし", () => {
    const v = VEHICLES.find((v) => v.id === "normal")!;
    expect(v.avoid).toHaveLength(0);
  });
});

describe("buildGoogleMapsUrl", () => {
  const base = {
    origin: "東京駅",
    destination: "新宿駅",
  };

  it("genki1: avoid=highways|tolls|ferries を含む URL を生成する", () => {
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "genki1" });
    expect(url).toContain("avoid=highways%7Ctolls%7Cferries");
    expect(url).toContain("origin=%E6%9D%B1%E4%BA%AC%E9%A7%85");
    expect(url).toContain("travelmode=driving");
  });

  it("genki2: avoid=highways|tolls を含む URL を生成する", () => {
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "genki2" });
    expect(url).toContain("avoid=highways%7Ctolls");
    expect(url).not.toContain("ferries");
  });

  it("normal: avoid パラメータなし", () => {
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "normal" });
    expect(url).not.toContain("avoid=");
  });

  it("google.com/maps/dir/ を起点とする URL", () => {
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "normal" });
    expect(url).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\//);
  });
});
