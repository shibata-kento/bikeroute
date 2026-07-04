export type VehicleClass = "genki1" | "genki2" | "normal";

export const VEHICLES = [
  {
    id: "genki1" as VehicleClass,
    label: "原付一種",
    sublabel: "50cc・新基準原付",
    description: "自動車専用道路・高速道路NG、二段階右折あり",
    avoid: ["highways", "tolls", "ferries"],
  },
  {
    id: "genki2" as VehicleClass,
    label: "原付二種",
    sublabel: "125cc以下",
    description: "自動車専用道路・高速道路NG",
    avoid: ["highways", "tolls"],
  },
  {
    id: "normal" as VehicleClass,
    label: "普通二輪以上",
    sublabel: "126cc〜",
    description: "全道路通行可",
    avoid: [],
  },
] as const;

export function buildGoogleMapsUrl(params: {
  origin: string;
  destination: string;
  vehicleClass: VehicleClass;
}): string {
  const vehicle = VEHICLES.find((v) => v.id === params.vehicleClass)!;
  // Use URLSearchParams for origin/destination encoding, but append avoid with
  // literal "|" — Google Maps URL API does not accept percent-encoded %7C.
  const qs = new URLSearchParams({
    api: "1",
    origin: params.origin,
    destination: params.destination,
    travelmode: "driving",
  });
  let url = `https://www.google.com/maps/dir/?${qs.toString()}`;
  // Pass each avoid value as a separate parameter — Google Maps only processes
  // the first value when using pipe-joined avoid=highways|tolls.
  for (const a of vehicle.avoid) {
    url += `&avoid=${a}`;
  }
  return url;
}
