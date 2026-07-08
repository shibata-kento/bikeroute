import Link from "next/link";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AuthErrorPage() {
  return (
    <main className="mx-auto max-w-sm px-4 py-20 text-center">
      <p className="text-2xl">⚠️</p>
      <h1 className="mt-2 text-lg font-bold text-gray-900">ログインに失敗しました</h1>
      <p className="mt-2 text-sm text-gray-500">
        もう一度お試しいただくか、時間をおいてアクセスしてください。
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600"
      >
        トップに戻る
      </Link>
    </main>
  );
}
