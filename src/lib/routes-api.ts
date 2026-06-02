import type { VehicleClass } from "./vehicle";
import { VEHICLES } from "./vehicle";

export interface RoutesApiResult {
  encodedPolyline: string;
  distanceMeters: number;
  durationSeconds: number;
}

const ROUTES_API_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

export async function computeRoute(params: {
  origin: string;
  destination: string;
  vehicleClass: VehicleClass;
}): Promise<RoutesApiResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_MAPS_API_KEY が設定されていません");

  const vehicle = VEHICLES.find((v) => v.id === params.vehicleClass)!;

  const avoidList = vehicle.avoid as readonly string[];
  const body = {
    origin: { address: params.origin },
    destination: { address: params.destination },
    travelMode: "DRIVE",
    routeModifiers: {
      avoidHighways: avoidList.includes("highways"),
      avoidTolls: avoidList.includes("tolls"),
      avoidFerries: avoidList.includes("ferries"),
    },
    polylineQuality: "HIGH_QUALITY",
    computeAlternativeRoutes: false,
  };

  const res = await fetch(ROUTES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.polyline,routes.distanceMeters,routes.duration",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Routes API エラー (${res.status}): ${text}`);
  }

  const data = await res.json();
  const route = data.routes?.[0];
  if (!route) throw new Error("ルートが見つかりませんでした");

  return {
    encodedPolyline: route.polyline.encodedPolyline as string,
    distanceMeters: route.distanceMeters as number,
    durationSeconds: parseInt((route.duration as string).replace("s", ""), 10),
  };
}
