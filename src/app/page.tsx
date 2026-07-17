import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: { absolute: "50cc・125cc 通行禁止マップ｜原付・バイクが通れない道を事前チェック - BikeRoute" },
  description:
    "50cc・125cc・二輪車が通れない道（自動車専用道路・二輪禁止トンネル）をマップで事前確認。出発地・目的地と車種を入力するだけで、原付が通れない通行禁止区間を自動チェックできます。無料。",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Page() {
  return <HomePage />;
}
