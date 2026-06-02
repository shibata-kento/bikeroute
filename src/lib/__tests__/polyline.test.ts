import { describe, it, expect } from "vitest";
import { decodePolyline, toLineStringWKT } from "../polyline";

describe("decodePolyline", () => {
  // Google 公式ドキュメントの例: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
  it("Google 公式サンプルをデコードする", () => {
    const encoded = "_p~iF~ps|U_ulLnnqC_mqNvxq`@";
    const result = decodePolyline(encoded);
    expect(result).toHaveLength(3);
    expect(result[0][0]).toBeCloseTo(38.5, 4);
    expect(result[0][1]).toBeCloseTo(-120.2, 4);
    expect(result[1][0]).toBeCloseTo(40.7, 4);
    expect(result[1][1]).toBeCloseTo(-120.95, 4);
    expect(result[2][0]).toBeCloseTo(43.252, 4);
    expect(result[2][1]).toBeCloseTo(-126.453, 4);
  });

  it("1点のみのエンコードをデコードする", () => {
    // 東京駅付近 (35.6812, 139.7671) → encode して decode
    const encoded = "wm`xEkjvoY"; // 35.67616, 139.76416 相当の簡易例
    const result = decodePolyline(encoded);
    expect(result.length).toBeGreaterThan(0);
    const [lat, lng] = result[0];
    expect(lat).toBeGreaterThan(30);
    expect(lat).toBeLessThan(46);
    expect(lng).toBeGreaterThan(129);
    expect(lng).toBeLessThan(146);
  });

  it("空文字列は空配列を返す", () => {
    expect(decodePolyline("")).toHaveLength(0);
  });
});

describe("toLineStringWKT", () => {
  it("lat/lng ペアを LINESTRING WKT に変換する（lon lat 順）", () => {
    const points: [number, number][] = [
      [35.0, 139.0],
      [36.0, 140.0],
    ];
    expect(toLineStringWKT(points)).toBe("LINESTRING(139 35, 140 36)");
  });

  it("小数点の座標を正確に出力する", () => {
    const points: [number, number][] = [[35.12345, 139.98765]];
    const wkt = toLineStringWKT(points);
    expect(wkt).toContain("139.98765 35.12345");
  });
});
