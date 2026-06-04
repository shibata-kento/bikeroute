"use client";

import { useState } from "react";
import Link from "next/link";
import { VehicleSelector } from "@/components/VehicleSelector";
import { RouteResult } from "@/components/RouteResult";
import type { VehicleClass } from "@/lib/vehicle";
import type { RouteCheckResult } from "@/app/api/route/route";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; result: RouteCheckResult }
  | { status: "error"; message: string };

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState<VehicleClass>("genki1");
  const [state, setState] = useState<State>({ status: "idle" });

  const canSubmit =
    origin.trim() !== "" && destination.trim() !== "" && state.status !== "loading";

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, vehicleClass: vehicle }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "ルート計算に失敗しました");

      setState({ status: "done", result: data as RouteCheckResult });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "エラーが発生しました",
      });
    }
  }

  function openMaps() {
    if (state.status !== "done") return;
    window.open(state.result.mapsUrl, "_blank", "noopener,noreferrer");
  }

  function reset() {
    setState({ status: "idle" });
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          🏍️ BikeRoute
        </h1>
        <p className="mt-2 text-gray-600">
          車種に合わせた通行制限を確認して、Googleマップで最適ルートを開きます
        </p>
      </header>

      {state.status !== "done" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="origin"
                className="block text-sm font-semibold text-gray-700"
              >
                出発地
              </label>
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="例: 東京駅"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="block text-sm font-semibold text-gray-700"
              >
                目的地
              </label>
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="例: 箱根町"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <VehicleSelector value={vehicle} onChange={setVehicle} />

          {state.status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl bg-orange-500 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {state.status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                ルートを確認中…
              </span>
            ) : (
              "ルートを確認する →"
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
            <span className="font-semibold">{origin}</span>
            {" → "}
            <span className="font-semibold">{destination}</span>
          </div>

          <RouteResult result={state.result} onOpenMaps={openMaps} />

          <button
            onClick={reset}
            className="w-full rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            ← もう一度検索する
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/segments"
          className="text-sm text-orange-600 underline hover:text-orange-800"
        >
          通行禁止区間リストを見る →
        </Link>
      </div>

      {/* 内部リンク：解説記事 */}
      <div className="mt-10 border-t border-gray-100 pt-8">
        <p className="text-xs font-bold text-gray-500 mb-3">通行ルールを詳しく知る</p>
        <ul className="space-y-2">
          {[
            { href: "/articles/bike-traffic-rules", label: "原付・125cc・二輪の通行ルール完全ガイド" },
            { href: "/articles/125cc-road-guide", label: "原付二種で通れる道・通れない道" },
            { href: "/articles/shutoko-bike-restriction", label: "首都高バイク通行禁止区間まとめ" },
            { href: "/articles/bike-no-entry-signs", label: "二輪通行禁止の標識の見分け方" },
            { href: "/articles/moped-expressway-reason", label: "有料道路・バイパスで原付が通れない理由" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-sm text-gray-600 hover:text-orange-600 hover:underline">
                → {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4">
          <Link href="/prefectures" className="text-sm text-gray-500 hover:text-orange-600 hover:underline">
            都道府県別の通行禁止区間 →
          </Link>
          <Link href="/faq" className="text-sm text-gray-500 hover:text-orange-600 hover:underline">
            よくある質問 →
          </Link>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-400">
        <p>
          表示される情報は参考情報です。走行時は必ず道路標識を確認してください。
        </p>
        <p className="mt-1">
          <a
            href="https://github.com/shibata-kento/bikeroute"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}
