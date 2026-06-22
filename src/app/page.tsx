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
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          🏍️ BikeRoute
        </h1>
        <p className="mt-2 text-gray-600">
          バイク・原付の通行禁止区間を事前チェック
        </p>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
          Google マップは車種を考慮しません。出発地・目的地・車種を入力するだけで、
          ルート上に原付50ccや二輪車が通れない道が含まれていないかを自動判定します。
        </p>
      </header>

      {/* サービス説明（Googleクローラー向けにも重要なテキストコンテンツ） */}
      <section className="mb-6 rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm leading-relaxed text-gray-700">
        <h2 className="font-bold text-gray-900 mb-2">なぜルート確認が必要なの？</h2>
        <p className="mb-2">
          原付一種（50cc以下）・原付二種（125cc以下）は、<strong>自動車専用道路・高速道路・首都高・阪神高速など</strong>を通行できません。
          しかしGoogle マップはこれを無視してルートを案内するため、知らずに進入してしまうリスクがあります。
        </p>
        <p>
          BikeRouteは車種を選ぶだけで、ルート上の通行禁止区間を自動チェックします。ツーリング前の5分で、違反・危険を未然に防げます。
        </p>
      </section>

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
          通行禁止区間マップを見る →
        </Link>
      </div>

      {/* なぜBikeRouteが必要か */}
      <section className="mt-10 border-t border-gray-100 pt-8">
        <h2 className="text-lg font-black text-gray-900 mb-3">なぜBikeRouteが必要か</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Google マップや一般的なカーナビは、バイクの車種（排気量・区分）を考慮したルート案内に対応していません。
          原付一種（50cc以下）や原付二種（125cc以下）のライダーが Google マップのルートをそのまま走ると、
          自動車専用道路や高速道路に誘導されてしまうことがあります。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          BikeRoute は車種ごとの通行ルールを自動で判定し、ルート上に通行禁止区間が含まれていないかを
          出発前にチェックできるWebアプリです。知らずに通行禁止区間へ侵入するリスクを出発前に防ぎます。
        </p>
      </section>

      {/* 使い方 3ステップ */}
      <section className="mt-8">
        <h2 className="text-lg font-black text-gray-900 mb-4">3ステップで使える</h2>
        <ol className="space-y-3">
          {[
            {
              step: "1",
              title: "出発地・目的地を入力",
              desc: "住所・地名・スポット名など、Google マップと同じ感覚で入力できます。",
            },
            {
              step: "2",
              title: "車種を選択",
              desc: "原付一種（50cc以下・新基準原付）、原付二種（125cc以下）、普通二輪以上（126cc〜）から選びます。",
            },
            {
              step: "3",
              title: "ルートを確認する",
              desc: "通行禁止区間が含まれていればその場で警告。問題なければ Google マップでルートを開けます。",
            },
          ].map(({ step, title, desc }) => (
            <li key={step} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-black">
                {step}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 対応している禁止区間の種類 */}
      <section className="mt-8">
        <h2 className="text-lg font-black text-gray-900 mb-3">対応している通行禁止区間</h2>
        <div className="space-y-2">
          {[
            {
              label: "自動車専用道路",
              desc: "高速道路・首都高・阪神高速・自動車専用バイパス。原付一種・二種は通行禁止。普通二輪以上は通行可。",
              color: "bg-blue-50 border-blue-200 text-blue-800",
            },
            {
              label: "二輪車通行禁止区間",
              desc: "山手トンネル・川崎トンネルなど。排気量に関係なくすべての二輪が禁止。",
              color: "bg-red-50 border-red-200 text-red-800",
            },
            {
              label: "原付通行禁止区間",
              desc: "幹線道路の一部に設置。原付一種・二種が禁止、普通二輪以上（126cc〜）は通行可。",
              color: "bg-yellow-50 border-yellow-200 text-yellow-800",
            },
          ].map(({ label, desc, color }) => (
            <div key={label} className={`rounded-lg border px-4 py-3 ${color}`}>
              <p className="text-xs font-bold">{label}</p>
              <p className="text-xs mt-0.5 opacity-80">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          データはJMPSA・国土交通省・OpenStreetMap・ユーザー投稿をもとに構成されています。
        </p>
      </section>

      {/* 内部リンク：解説記事 */}
      <div className="mt-10 border-t border-gray-100 pt-8">
        <p className="text-xs font-bold text-gray-500 mb-3">通行ルールを詳しく知る</p>
        <ul className="space-y-2">
          {[
            { href: "/articles/bike-restriction-map", label: "50cc・バイクの通行禁止区間マップの見方と使い方" },
            { href: "/articles/shutoko-bike-restriction", label: "首都高バイク通行禁止区間まとめ（東京）" },
            { href: "/articles/osaka-bike-restriction", label: "大阪のバイク通行禁止区間まとめ（阪神高速）" },
            { href: "/articles/kanagawa-bike-restriction", label: "神奈川のバイク通行禁止区間まとめ（横羽線・湾岸線）" },
            { href: "/articles/bike-traffic-rules", label: "原付・125cc・二輪の通行ルール完全ガイド" },
            { href: "/articles/125cc-road-guide", label: "125ccが走れない道路・走れる道路ガイド" },
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

      {/* 主要エリアリンク */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <p className="text-xs font-bold text-gray-500 mb-3">主要エリアの通行禁止区間マップ</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {[
            { href: "/prefectures/tokyo", label: "東京都" },
            { href: "/prefectures/kanagawa", label: "神奈川県" },
            { href: "/prefectures/osaka", label: "大阪府" },
            { href: "/prefectures/aichi", label: "愛知県" },
            { href: "/prefectures/fukuoka", label: "福岡県" },
            { href: "/prefectures/hyogo", label: "兵庫県" },
            { href: "/prefectures/saitama", label: "埼玉県" },
            { href: "/prefectures/chiba", label: "千葉県" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-center text-xs font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
        <Link href="/prefectures" className="mt-2 inline-block text-xs text-gray-400 hover:text-orange-600 hover:underline">
          全47都道府県を見る →
        </Link>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-400 space-y-1">
        <p>表示される情報は参考情報です。走行時は必ず道路標識を確認してください。</p>
        <div className="flex justify-center gap-4">
          <Link href="/about" className="underline hover:text-gray-600">運営者情報</Link>
          <Link href="/privacy" className="underline hover:text-gray-600">プライバシーポリシー</Link>
          <a
            href="https://github.com/shibata-kento/bikeroute"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
