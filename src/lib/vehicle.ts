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
  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("origin", params.origin);
  url.searchParams.set("destination", params.destination);
  url.searchParams.set("travelmode", "driving");
  if (vehicle.avoid.length > 0) {
    url.searchParams.set("avoid", vehicle.avoid.join("|"));
  }
  return url.toString();
}
