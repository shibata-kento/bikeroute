/** Google Encoded Polyline Algorithm Format のデコード */
export function decodePolyline(encoded: string): [number, number][] {
  const result: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result_val = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result_val |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lat += result_val & 1 ? ~(result_val >> 1) : result_val >> 1;

    shift = 0;
    result_val = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result_val |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    lng += result_val & 1 ? ~(result_val >> 1) : result_val >> 1;

    result.push([lat / 1e5, lng / 1e5]);
  }

  return result;
}

/** lat/lng の配列を PostGIS LINESTRING WKT に変換 */
export function toLineStringWKT(points: [number, number][]): string {
  const coords = points.map(([lat, lng]) => `${lng} ${lat}`).join(", ");
  return `LINESTRING(${coords})`;
}
