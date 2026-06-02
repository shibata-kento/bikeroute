import type { VehicleClass } from "@/lib/supabase/types";

export type RestrictionCategory = "all_bikes" | "under125" | "moped_only";

export const CATEGORY_CONFIG: Record<
  RestrictionCategory,
  { appliesToExact: VehicleClass[]; sources: string[]; restrictionTags?: string[]; label: string; description: string }
> = {
  all_bikes: {
    appliesToExact: ["genki1", "genki2", "normal"],
    sources: ["osm", "user"],
    label: "全二輪禁止",
    description: "二輪車全般の通行禁止区間（motorcycle=no）",
  },
  under125: {
    appliesToExact: ["genki1", "genki2"],
    sources: ["osm", "user"],
    restrictionTags: ["motorroad"],
    label: "125cc以下禁止",
    description: "自動車専用道路（バイパス等）+ ユーザー投稿",
  },
  moped_only: {
    appliesToExact: ["genki1"],
    sources: ["osm", "user"],
    label: "原付一種禁止",
    description: "50cc以下の通行禁止区間（moped=no）",
  },
};

export const CATEGORY_LIST = [
  "all_bikes",
  "under125",
  "moped_only",
] as const satisfies RestrictionCategory[];
