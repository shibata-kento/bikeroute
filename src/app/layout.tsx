import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/AuthButton";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bikeroute.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "BikeRoute — 50cc・バイク 通行禁止区間マップ",
    template: "%s | BikeRoute",
  },
  description:
    "50cc・125cc・二輪車の通行禁止区間をマップで事前確認。原付が通れない道・自動車専用道路を出発前にチェック。50cc通行禁止マップ・二輪車通行禁止マップとして使えます。",
  keywords: [
    "50cc 通行禁止 マップ",
    "二輪車 通行禁止 マップ",
    "バイク 通行禁止 マップ",
    "125cc 通行禁止 マップ",
    "原付 自動車専用道路",
    "50cc 通れない道",
    "二輪通行禁止区間",
    "原付一種 高速道路",
    "原付二種 バイパス",
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "BikeRoute",
    title: "BikeRoute — 50cc・バイク 通行禁止区間マップ",
    description:
      "50cc・125cc・二輪車の通行禁止区間をマップで事前確認。原付が通れない道を出発前にチェック。",
  },
  twitter: {
    card: "summary",
    title: "BikeRoute — 50cc・バイク 通行禁止区間マップ",
    description: "50cc・125cc・二輪車の通行禁止区間マップ。原付が通れない道を出発前に確認。",
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "B_Wu1VSaKJNomuyjn6oqg8xvhG9wi2lGWxZMThGIWow",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BikeRoute",
              url: "https://bikeroute.vercel.app",
              description:
                "50cc・125cc・二輪車の通行禁止区間をマップで事前確認できるWebアプリ。原付が通れない道・自動車専用道路を車種別にチェック。",
              inLanguage: "ja",
              publisher: {
                "@type": "Organization",
                name: "BikeRoute",
                url: "https://bikeroute.vercel.app",
              },
            }),
          }}
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7521900221411063"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <nav className="border-b border-gray-200 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <Link href="/" className="text-sm font-black text-gray-900 hover:text-orange-500">
              🏍️ BikeRoute
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/segments"
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                禁止区間
              </Link>
              <Link
                href="/prefectures"
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                都道府県別
              </Link>
              <Link
                href="/faq"
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                FAQ
              </Link>
              <AuthButton userEmail={user?.email} />
            </div>
          </div>
        </nav>
        {children}
        <footer className="mt-12 border-t border-gray-200 bg-white px-4 py-6">
          <div className="mx-auto max-w-2xl flex flex-col gap-1 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 BikeRoute — MIT License / Data: ODbL 1.0</span>
            <div className="flex gap-4">
              <Link href="/articles" className="hover:text-gray-600">解説記事</Link>
              <Link href="/guide" className="hover:text-gray-600">使い方</Link>
              <Link href="/faq" className="hover:text-gray-600">FAQ</Link>
              <Link href="/about" className="hover:text-gray-600">運営者情報</Link>
              <Link href="/privacy" className="hover:text-gray-600">プライバシーポリシー</Link>
              <a
                href="https://github.com/shibata-kento/bikeroute"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
