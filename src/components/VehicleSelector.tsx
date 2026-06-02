"use client";

import { VEHICLES, type VehicleClass } from "@/lib/vehicle";

interface Props {
  value: VehicleClass;
  onChange: (v: VehicleClass) => void;
}

export function VehicleSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        バイクの車種
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        {VEHICLES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onChange(v.id)}
            className={[
              "rounded-xl border-2 p-4 text-left transition-all",
              value === v.id
                ? "border-orange-500 bg-orange-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-orange-300",
            ].join(" ")}
          >
            <div className="font-bold text-gray-900">{v.label}</div>
            <div className="text-xs text-gray-500">{v.sublabel}</div>
            <div className="mt-1 text-xs text-gray-600">{v.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
