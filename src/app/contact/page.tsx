import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "お問い合わせ",
  description:
    "BikeRouteへのお問い合わせはこちらから。データの誤り・不具合報告・ご意見・ご要望などをお気軽にお送りください。",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: "ホーム", path: "/" },
        { name: "お問い合わせ", path: "/contact" },
      ]} />

      <h1 className="mb-2 text-2xl font-black text-gray-900">お問い合わせ</h1>
      <p className="mb-8 text-sm text-gray-500">
        データの誤り・不具合のご報告・ご意見・ご要望などはこちらからお送りください。
      </p>

      <div className="mb-6 space-y-2 text-sm text-gray-700">
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 space-y-1">
          <p className="font-bold text-gray-900">こんなときにご利用ください</p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-600">
            <li>通行禁止区間データの誤り・最新情報との相違</li>
            <li>ルートチェック機能の不具合</li>
            <li>新しい通行禁止区間の情報提供</li>
            <li>機能追加のご要望・ご意見</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdtqHfdG3nEWPC_xRjvOK78qeMsJkMq_Z3bsh5Q-Ljp2Rwz5A/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-md hover:bg-orange-600 transition-colors"
        >
          お問い合わせフォームを開く →
        </a>
        <p className="mt-3 text-xs text-gray-400">Googleフォームが新しいタブで開きます</p>
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 border border-gray-200 px-4 py-4 text-sm text-gray-700">
        <p className="font-bold text-gray-900 mb-1">エンジニアの方へ</p>
        <p className="text-xs text-gray-600">
          技術的な課題・バグ報告は{" "}
          <a
            href="https://github.com/shibata-kento/bikeroute/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            GitHub Issues
          </a>{" "}
          もご利用いただけます。
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-orange-600 hover:underline">
          ← トップページに戻る
        </Link>
      </div>
    </main>
  );
}
