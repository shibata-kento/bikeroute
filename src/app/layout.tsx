import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/AuthButton";

export const metadata: Metadata = {
  title: "BikeRoute - 車種別ルート案内",
  description: "バイクの車種に応じた通行制限を考慮してGoogleマップで最適ルートを開きます",
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
      </body>
    </html>
  );
}
