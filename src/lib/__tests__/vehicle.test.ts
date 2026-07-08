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

  it("genki1: highways / tolls / ferries を個別の avoid パラメータで生成する", () => {
    // Google マップは avoid=highways|tolls のような pipe 結合だと先頭値しか解釈しないため、
    // avoid=highways&avoid=tolls&avoid=ferries のように個別パラメータで渡す
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "genki1" });
    expect(url).toContain("avoid=highways");
    expect(url).toContain("avoid=tolls");
    expect(url).toContain("avoid=ferries");
    expect(url).toContain("origin=%E6%9D%B1%E4%BA%AC%E9%A7%85");
    expect(url).toContain("travelmode=driving");
  });

  it("genki2: highways / tolls を個別の avoid パラメータで生成し ferries は含まない", () => {
    const url = buildGoogleMapsUrl({ ...base, vehicleClass: "genki2" });
    expect(url).toContain("avoid=highways");
    expect(url).toContain("avoid=tolls");
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
