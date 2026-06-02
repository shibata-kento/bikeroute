import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/AuthButton";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bikeroute.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "BikeRoute — バイク車種別 通行禁止区間チェック",
    template: "%s | BikeRoute",
  },
  description:
    "原付・125cc・二輪車の通行禁止区間を地図で確認。出発地と目的地を入力するだけで、あなたのバイクが通れない道が含まれていないかを事前にチェックできます。",
  keywords: [
    "バイク 通行禁止",
    "原付 自動車専用道路",
    "50cc 通れない道",
    "125cc ルート確認",
    "二輪車 通行禁止 地図",
    "原付一種 高速道路",
    "原付二種 バイパス",
    "バイク ルート",
    "二輪通行禁止区間",
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "BikeRoute",
    title: "BikeRoute — バイク車種別 通行禁止区間チェック",
    description:
      "原付・125cc・二輪車の通行禁止区間を地図で確認。出発地・目的地と車種を選ぶだけ。",
  },
  twitter: {
    card: "summary",
    title: "BikeRoute — バイク車種別 通行禁止区間チェック",
    description: "原付・125cc・二輪車の通行禁止区間を事前に確認できるWebアプリ。",
  },
  alternates: {
    canonical: BASE_URL,
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
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7521900221411063"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
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
              <AuthButton userEmail={user?.email} />
            </div>
          </div>
        </nav>
        {children}
        <footer className="mt-12 border-t border-gray-200 bg-white px-4 py-6">
          <div className="mx-auto max-w-2xl flex flex-col gap-1 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 BikeRoute — MIT License / Data: ODbL 1.0</span>
            <div className="flex gap-4">
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
